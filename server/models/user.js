const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  confirmPassword: String
});
module.exports = mongoose.model("user", userSchema, "user_profile");
