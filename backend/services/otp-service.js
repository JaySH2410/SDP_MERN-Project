const crypto = require('crypto');
const { PhoneNumberContext } = require('twilio/lib/rest/lookups/v1/phoneNumber');

const smsSid= process.env.SMS_SID;
const smsAuthToken= process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid,smsAuthToken, {
    lazyLoading: true //optimize loading
});

class OtpService {
    async generateOtp(){
        const otp = crypto.randomInt(1000,9999);
        return otp;
    }
    async sendOtp(){
        return await twilio.messages.create({
            to: PhoneNumberContext,
            from: process.env.SMS_FROM_NUMBER,
            body: `OTP is ${otp}`,
        })
    }
    verifyOtp(){

    }
}

module.exports = new OtpService();