const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

//Route 1: Fetch all notes using: POST "api/auth/fetchallnotes". Login required
// header me se token lena hai
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});
//Route 2: Add a new note using: POST "api/auth/addnotes". Login required
router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be at least 5 characters").isLength({
      min: 3,
    }),
  ],
  fetchuser,
  async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({ title, description, tag, user: req.user.id });
    // const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  }
);
module.exports = router;
