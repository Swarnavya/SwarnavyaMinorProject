const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const courseSchema = new Schema({
  course_name: String,
  mentor_name: String,
  mentor_experience: String,
  traning_completed: Number,
  rating: String,
  time: String,
  course_duration: String,
  course_price: String
});
module.exports = mongoose.model("course", courseSchema, "courses");
