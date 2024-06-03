const express = require("express");
const { authMiddleware } = require("../middleware");
const { Course } = require("../db");
const axios = require('axios');

const router = express.Router();

router.post("/subtopic", authMiddleware, async (req, res) => {
  const title = req.body.title;
  const userId = req.userId;

  const course = await Course.create({
    title,
    userId,
  });

  const courseId = course.courseId;

  const response = await axios.post(
    "https://api.dify.ai/v1/chat-messages",
    {
      inputs: {},
      query: title,
      response_mode: "blocking",
      conversation_id: "",
      user: "Fromtheauthorsomethingfromdb",
    },
    {
      headers: {
        Authorization: "Bearer app-rELfM96DfTkUDoDby2q3a9FJ",
      },
    }
  );

  return res.json({
    courseId,
    subtopics: response.data.answer,
  });
});

module.exports = router;
