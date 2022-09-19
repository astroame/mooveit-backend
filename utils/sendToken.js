import CryptoJS from "crypto-js";

// Get token from model, create a cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  // Encrypt user object
  var response = CryptoJS.AES.encrypt(JSON.stringify(user), process.env.ENCRYPTION_KEY).toString();

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    response,
  });
};

export default sendTokenResponse;
