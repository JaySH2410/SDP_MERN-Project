const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");



class AuthController {
    async sendOtp(req, res){

        const {phone} = req.body;
        if(!phone){
            res.status(400).json({message: 'Phone Field is required'});
        }

        //OTP
        const timeLimit = 1000*60*2;//2min otp limit
        const otp = await otpService.generateOtp();
        //res.json({otp: otp}); //sending otp
        
        //Hash
        const expires = Date.now()+timeLimit;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);
        res.json({hash: hash});//sending hash
    }
}

module.exports = new AuthController();