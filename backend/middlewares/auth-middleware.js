const tokenService = require("../services/token-service");

module.exports = async function(req, res, next){
    //console.log('1');
    try{
        
        const { accessToken } = req.cookies;
        if(!accessToken){
            throw new Error();
        }
        const userData = await tokenService.verifyAccessToken(accessToken);
        
        if(!userData){
            throw new Error();
        }
        req.user = userData;
        //console.log(userData);//\/
        next();
    }catch(err){
        //console.log(err);
        res.status(401).json({message: 'Not a valid Token'});
    }
}