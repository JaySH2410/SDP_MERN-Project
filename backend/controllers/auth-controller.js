const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');
//const UserDto = require('../dtos/user-dto');


class AuthController {
    async sendOtp(req, res) {
        // console.log("Auth CONTROLLER");
        const { phone } = req.body;
        //console.log(phone);
        if (!phone) {
            res.status(400).json({ message: 'Phone field is required!' });
        }

        const otp = await otpService.generateOtp();

        const ttl = 1000 * 60 * 10; // 2 min
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        // send OTP
        try {
            // await otpService.sendBySms(phone, otp);
            res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'message sending failed' });
        }
    
    }



    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;
       
    
        if (!otp || !hash || !phone) {
            res.status(400).json({ message: 'All fields are required!' });
        }

        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {
            res.status(400).json({ message: 'OTP expired!' });
        }

        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data);
        
        if (!isValid) {
            res.status(400).json({ message: 'Invalid OTP' });
        }

        let user;
        try {
            user = await userService.findUser({ phone });
            if (!user) {
                user = await userService.createUser({ phone });
            }
        } catch (err) {
            res.status(500).json({ message: 'Db error' });
        }

        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });

        await tokenService.storeRefreshToken(refreshToken, user._id);

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        const userDto = new UserDto(user);
        res.json({
            user: userDto,
            auth: true
        });
    }

    async refresh(req, res){
        //get refresh token
        const {refreshToken: refreshTokenFromCookie} = req.cookies;
        let userData;   
        //check if token valid?
        try{
            userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
        }catch(err){
            res.status(401).json({message: 'Invalid token'});
        }
        //check if token in database
        try{
            const token = await tokenService.findRefreshToken(userData._id, refreshTokenFromCookie);

            if(!token){
                return res.status(401).json({message: 'invalid token'});
            }
        } catch(err){
            res.status(500).json({message: 'internal error'});
        }
        //check if valid user
        const user = await userService.findUser({_id: userData._id});
        if(!user){
            res.status(404).json({message: 'user no found'});
        }
        //generate new token
        const {refreshToken, accessToken} = tokenService.generateTokens({_id: userData._id});
        //update refresh token
        try{
            await tokenService.updateRefreshToken(userData._id, refreshToken);
        } catch(err){
            res.status(500).json({message: 'internal error'});
        }
        //put cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        const userDto = new UserDto(user);
        res.json({
            user: userDto,
            auth: true
        });
    }

    async logout(req, res){
        const {refreshToken} = req.cookies;
        //delete refresh token
        await tokenService.removeToken(refreshToken);
        //delete cookies
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({user: null, auth: false});
        //
    }
}

module.exports = new AuthController();