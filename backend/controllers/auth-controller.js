class AuthController {
    sendOtp(req, res){

        const {phone} = req.body;
        if(!phone){
            res.status(400).json({message: 'Phone Field is required'});
        }
        res.send("Hello From otp controller");
    }
}

module.exports = new AuthController();