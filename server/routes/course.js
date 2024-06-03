const express = require("express");
const { authMiddleware } = require("../middleware");
const { Course } = require("../db");
const axios = require("axios");

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

router.post("/newtopic", authMiddleware, async (req, res) => {
  const title = req.body.title;
  const query = req.body.query;
  const courseId = req.body.courseId;

  const userId = req.userId;

  const response = await axios.post(
    "https://api.dify.ai/v1/chat-messages",
    {
      inputs: {},
      query,
      response_mode: "blocking",
      conversation_id: "",
      user: "abc-123",
    },
    {
      headers: {
        Authorization: "Bearer app-sBXe1EMxVQYqQSygb06oYXgC",
      },
    }
  );

  const answer = response.data.answer;
  const result = parseCourseOutline(answer);
  const subtopics = result.subtopics;

//   await Course.findOneAndUpdate(
//     {
//       courseId,
//     },
//     { $inc: { subtopics } }
//   );

  return res.json({
    courseId,
    subtopics,
  });
});

function parseCourseOutline(outline) {
    const topics = outline.split('---');
    const jsonOutput = {
      subtopics: []
    };
  
    topics.forEach((topic) => {
      const match = topic.match(/# (.+)/);
      if (match) {
        const topicTitle = match[1].trim();
        let content = topic.replace(match[0], '').trim();
  
        // Remove "#" and "\n" characters and "#### Overview:" from content
        content = content.replace(/#/g, '').replace(/\n/g, ' ').replace(/#### Overview:/g, '').trim();
  
        const subtopic = {
          [topicTitle]: {
            text: content,
            image: '',
            video: ''
          }
        };
  
        jsonOutput.subtopics.push(subtopic);
      }
    });
  
    return jsonOutput;
  }

module.exports = router;
