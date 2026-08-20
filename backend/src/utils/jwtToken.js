// Create and send token and save in cookie
const sendToken = (user, statusCode, res) => {
  // Create JWT token
  const token = user.getJWTToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  const safeUser = user.toObject ? user.toObject() : { ...user };
  delete safeUser.password;
  delete safeUser.resetPasswordToken;
  delete safeUser.resetPasswordExpire;

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: safeUser,
  });
};

module.exports = sendToken;
