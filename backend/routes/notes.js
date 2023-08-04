const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

//Route 1: Fetch all notes using: GeT "api/notes/fetchallnotes". Login required
// header me se token lena hai
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

//Route 2: Add a new note using: POST "api/notes/addnotes". Login required
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
    try {
      console.log(req.body, "req");
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // new entity for mongo
      const note = new Note({ title, description, tag, user: req.user.id });
      // The save() method returns a promise. If save() succeeds, the promise resolves to the document that was saved.
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: Update an existing note using: PUT "api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    //if searched note doesn't exist
    if (!note) {
      return res.status(404).send("Not found");
    }
    // if the searched note doesn't belong to the logged in user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 4: Dalete a note using: DELETE "api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //create a newNote object
    // const newNote = {};
    // if (title) {
    //   newNote.title = title;
    // }
    // if (description) {
    //   newNote.description = description;
    // }
    // if (tag) {
    //   newNote.tag = tag;
    // }

    // find the note to be updated and delete it
    let note = await Note.findById(req.params.id);
    //if searched note doesn't exist
    if (!note) {
      return res.status(404).send("Not found");
    }
    // allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
