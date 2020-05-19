const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const mentorSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  experience: String,
  tech: String,
  password: String,
  confirmPassword: String
});
module.exports = mongoose.model("mentor", mentorSchema, "mentor_profile");
