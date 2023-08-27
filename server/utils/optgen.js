const { v4: uuidv4 } = require('uuid');



const generateOTP = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    return newOtp;
  };

  
  const generateAndCopyOTP = () => {
    const otp = generateOTP();
    
    return otp;
  };
  
  module.exports = {
    generateAndCopyOTP,
  };
  
  
  
  
  