const crypto = require('crypto');
const hashService = require('./hash-service');

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true,
});

class OtpService {
    async generateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    async sendBySms(phone, otp) {
        return await twilio.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `OTP is ${otp}`,
        });
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp;
    }
}

module.exports = new OtpService();
// const crypto = require('crypto');
// const hashService = require("../services/hash-service");

// const smsSid= process.env.SMS_SID;
// const smsAuthToken= process.env.SMS_AUTH_TOKEN;
// const twilio = require('twilio')(smsSid,smsAuthToken, {
//     lazyLoading: true //optimize loading
// });

// class OtpService {
//     async generateOtp(){
//         const otp = crypto.randomInt(1000,9999);
//         return otp;
//     }
//     async sendBySms(phone, otp){
//         return await twilio.messages.create({
//             to: phone,
//             from: process.env.SMS_FROM_NUMBER,
//             body: `OTP is ${otp}`,
//         })
//     }
//     verifyOtp(hashedOtp, data){
//         let compHash = hashService.hashOtp(data);
//         // if(compHash === hashedOtp){
//         //     return true;
//         // }
//         // return false;
//         return compHash === hashedOtp;
//     }
// }

// module.exports = new OtpService();