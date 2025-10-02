const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,   // fixed
  },
  email: {
    type: String,
    required: true,   // fixed
    unique: true,     // good practice for emails
  },
  phone: {
    type: Number,
    required: true,   // fixed
  },
  password: {
    type: String,
    required: true,   // fixed
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });


// 🔒 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); // added await
  next();
});

// compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// json web token 

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin
        },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn : "30d"
    }
    )
    } catch (error) {
        console.error(error)
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User;
