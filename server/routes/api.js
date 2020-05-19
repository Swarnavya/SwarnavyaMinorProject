const express = require("express");
const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const Mentor = require("../models/mentor");
const Course = require("../models/course");
router.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const url =
  "mongodb+srv://divyajyoti:8617763639@cluster0-uhn3b.mongodb.net/Divyajyoti_DB";

mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log("Error!" + err);
    } else {
      console.log("Connected to mongodb");
    }
  }
);

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request1");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized request2");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request3");
  }
  req.userId = payload.subject;
  next();
}

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request1");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorized request2");
  }
  let payload = jwt.verify(token, "secretKey");
  if (!payload) {
    return res.status(401).send("Unauthorized request3");
  }
  req.mentorId = payload.subject;
  next();
}

router.get("/", (req, res) => {
  res.send("From API route");
});
router.post("/userregister", (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error);
    } else {
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, "secretKey");
      res.status(200).send({ token, user });
    }
  });
});

router.post("/mentorregister", (req, res) => {
  let mentorData = req.body;
  let mentor = new Mentor(mentorData);
  mentor.save((error, registeredMentor) => {
    if (error) {
      console.log(error);
    } else {
      let payload = { subject: registeredMentor._id };
      let token = jwt.sign(payload, "secretKey");
      res.status(200).send({ token, mentor });
    }
  });
});

router.post("/userlogin", (req, res) => {
  let userData = req.body;
  User.findOne(
    { email: userData.email, password: userData.password },
    (error, user) => {
      if (error) {
        console.log(error);
      } else {
        if (!user) {
          res.status(401).send("Invalid email");
        } else if (user.password !== userData.password) {
          res.status(401).send("Invalid Password");
        } else {
          let payload = { subject: User._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token, user });
        }
      }
    }
  );
});

router.post("/mentorlogin", (req, res) => {
  let mentorData = req.body;
  Mentor.findOne(
    { email: mentorData.email, password: mentorData.password },
    (error, mentor) => {
      if (error) {
        console.log(error);
      } else {
        if (!mentor) {
          res.status(401).send("Invalid email");
        } else if (mentor.password !== mentorData.password) {
          res.status(401).send("Invalid Password");
        } else {
          let payload = { subject: Mentor._id };
          let token = jwt.sign(payload, "secretKey");
          res.status(200).send({ token, mentor });
        }
      }
    }
  );
});

router.post("/addcourse", (req, res) => {
  let courseData = req.body;
  console.log(req.body);
  let course = new Course(courseData);
  let result = course.save();
  res.send(result);
});

router.get("/special", verifyToken, (req, res) => {
  let specials = [
    {
      _id: "1",
      name: "Mean Stack",
      description:
        "MEAN is a free and open-source JavaScript software stack for building dynamic web sites and web applications. The MEAN stack is MongoDB, Express.js, AngularJS, and Node.js.",
      date: "2012-04-23T18:25:43.511Z"
    },
    {
      _id: "2",
      name: "Artificial Intelligence",
      description:
        "In computer science, artificial intelligence, sometimes called machine intelligence, is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans",
      date: "2012-04-23T18:25:43.511Z"
    },
    {
      _id: "3",
      name: "Cloud Computing",
      description:
        "Cloud computing is the on-demand availability of computer system resources, especially data storage and computing power, without direct active management by the user. The term is generally used to describe data centers available to many users over the Internet.",
      date: "2012-04-23T18:25:43.511Z"
    },
    {
      _id: "4",
      name: "Mobile Technology",
      description:
        "Mobile technology is the technology used for cellular communication. Mobile code-division multiple access technology has evolved rapidly over the past few years",
      date: "2012-04-23T18:25:43.511Z"
    },
    {
      _id: "5",
      name: "Big Data",
      description:
        "Big data is a field that treats ways to analyze, systematically extract information from, or otherwise deal with data sets that are too large or complex to be dealt with by traditional data-processing application software",
      date: "2012-04-23T18:25:43.511Z"
    },
    {
      _id: "6",
      name: "Internet of Things",
      description:
        "The Internet of Things is a system of interrelated computing devices, mechanical and digital machines, objects, animals or people that are provided with unique identifiers and the ability to transfer data over a network without requiring human-to-human or human-to-computer interaction",
      date: "2012-04-23T18:25:43.511Z"
    }
  ];
  res.json(specials);
});

router.get("/courses", async (req, res) => {
  try {
    let courses = await Course.find().exec();
    res.send(courses);
    //res.send("abcd")
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/course/:id", async (req, res) => {
  try {
    let course = await Course.findById(req.params.id).exec();
    res.send(course);
    //res.send("abcd")
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/userprofile", async (req, res) => {
  try {
    let userprofile = await User.find().exec();
    res.send(userprofile);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/mentorprofile", async (req, res) => {
  try {
    let mentorprofile = await Mentor.find().exec();
    res.send(mentorprofile);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/delete_user/:id", async (req, res) => {
  try {
    let result = await User.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/delete_mentor/:id", async (req, res) => {
  try {
    let result = await Mentor.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/delete_course/:id", async (req, res) => {
  try {
    let result = await Course.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.put("/course/:id", async (req, res) => {
  try {
    console.log("req.params.id : " + req.params.id);
    console.log("req.body");
    console.log(req.body);
    let filter = { _id: req.params.id };
    let update = {
      course_name: req.body.course_name,
      mentor_name: req.body.mentor_name,
      mentor_experience: req.body.mentor_experience,
      traning_completed: req.body.traning_completed,
      rating: req.body.rating,
      time: req.body.time,
      course_duration: req.body.course_duration,
      course_price: req.body.course_price
    };
    let result = await Course.findOneAndUpdate(filter, update, { new: true });
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
