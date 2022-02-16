const Jimp = require('jimp'); 
const path = require('path');   
const userService = require('../services/user-service');
const UserDto = require('../dtos/user-dto');

class ActivateController{
    
    async activate(req, res) {
        console.log('q');
        const { name, avatar } = req.body;
        if(!name || !avatar){
            res.status(400).json({message: 'some field/s are empty'});
        }
        
        const buffer = Buffer.from( avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),'base64');
        const imagePath = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}.png`;    

        try{
            const jimResp = await Jimp.read(buffer);
            jimResp
                .resize(150, Jimp.AUTO)
                .write(path.resolve(__dirname, `../storage/${imagePath}`));
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'error in processing image'});
        }

        //update user - activate value
        const userId = req.user._id;
        try{
            //console.log('userID');
            const user = await userService.findUser({_id: userId});
            if(!user){
                res.status(404).json({message: 'user not in database'});
            }       
            user.activated = true;
            user.name = name;
            user.avatar =  `/storage/${imagePath}`;
            user.save();
            res.json({user: new UserDto(user), auth: true });
        }catch(err){
            res.status(500).json({message: 'something went wrong'}); 
        }

        
    }
}

module.exports = new ActivateController();