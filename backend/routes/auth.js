const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "gojo1$3*";
//Route 1: Create a User using: POST "api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    //middleware
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      //check if a user exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email exists already",
        });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      //create a user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log({ authtoken });
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

//Route 2: Login a User using: POST "api/auth/login". No login required

router.post(
  "/login",
  [
    //middleware
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank ").exists(),
  ],
  async (req, res) => {
    let success = true;
    console.log(req.body);
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    // console.log("yo", { email, password });
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json("user not found with this email");
      }
      console.log("user", user);
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json("incorrect pwd");
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
//Route 3: Get User details using: POST "api/auth/getuser". login required
router.post(
  "/getuser",
  fetchuser,

  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
