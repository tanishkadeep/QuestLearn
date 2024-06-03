const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/questlearn");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
    unique: true,
    index: true,
  },
  courseId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtopics: [
    {
      subtopic: {
        text: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
        graph: {
          type: String,
        },
      },
    },
  ],
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  courseId: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = { User, Course };
