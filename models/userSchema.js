//mongoose schema
const mongoose = require("mongoose");
const uniqid = require("uniqid");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: uniqid(),
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (email) {
          let regexForEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
          return regexForEmail.test(email);
        },
      },
      message: "Please enter a valid email address",
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateHash = async function () {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(this.password, salt);
  return hash;
};

userSchema.pre("save", async function (next) {
  this.password = await this.generateHash();
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
