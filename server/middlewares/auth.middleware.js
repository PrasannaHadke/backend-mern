const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized HTTP, Token not provided" });
    }

    const jwtToken = token.replace("Bearer ", "").trim();
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({email : isVerified.email}).select('-password')
    console.log("userData", userData);
    
    req.user = userData;
    req.token = token;
    req.userID = userData._id; 

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Interval Server Error" });
  }
};

module.exports = authMiddleware;
