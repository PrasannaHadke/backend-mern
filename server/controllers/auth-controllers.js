const User = require("../models/user_model");

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
      msg: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        isAdmin: newUser.isAdmin,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { home, register };