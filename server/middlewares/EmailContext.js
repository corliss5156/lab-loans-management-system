const path = require('path')
require("dotenv").config({path: path.resolve(__dirname,'../.env')})
const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];

apiKey.apiKey = process.env.API_KEY
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = (sender, receiver, temppassword) => {
    
    const email = new SibApiV3Sdk.SendSmtpEmail();
    email.subject = "Reset password"
    email.htmlContent = "You have requested a password reset. Please use the temporary password to access your account: "+ temppassword 
    email.sender = {"name": sender, "email": sender}
    email.to = [{"name": receiver, "email": receiver}]
    apiInstance.sendTransacEmail(email).then(function(data){
      console.log(data)
        return JSON.stringify(data)
    }, function(error){
      console.log(error)
        return error
    })
} 


module.exports = sendEmail

