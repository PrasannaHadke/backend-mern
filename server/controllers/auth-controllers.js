const User = require("../models/user_model");
const bcrypt = require('bcrypt')
const home = async (req, res) => {
  try {
    res.status(200).send("using controllers");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    // req.status(200)
    // console.log(req.body);
    // res.status(200).send("this is a register page using controllers again");

    const { username, email, phone, password, isAdmin } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    const newUser = await User.create({ username, email, phone, password });

    res.status(201).json({
      msg: "Registration Successfully",
      token : await newUser.generateToken(),
      userId : newUser._id.toString()
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};


// login user

const loginUser = async (req,res)=>{
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if(!userExist) {
      return res.status(400).json({ message: "Please Register" });
    }

    const isValid = await userExist.isPasswordCorrect(password);

    if(!isValid){
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // password correct, send token
    return res.status(200).json({
      msg: "Login Successfully",
      token: await userExist.generateToken(),
      userId: userExist._id.toString()
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}



module.exports = { home, register , loginUser };