const express = require("express");
const router = express.Router();
const noteSchema = require("../Schema/notesSchema");

// Create a new note
router.post("/api/post", async (req, res) => {
  try {
    const data = new noteSchema(req.body);
    const savedNote = await data.save();
    console.log("Note saved:", savedNote);
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ error: "Error saving note" });
  }
});

// Get all notes
router.get("/api/get", async (req, res) => {
  try {
    const notes = await noteSchema.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Error fetching notes" });
  }
});

// Get all pinned notes
router.get("/api/pin/:noteId", async (req, res) => {
  try {
    const pinnedNotes = await noteSchema.find({ isPinned: true });
    res.status(200).json(pinnedNotes);
  } catch (error) {
    console.error("Error fetching pinned notes:", error);
    res.status(500).json({ error: "Error fetching pinned notes" });
  }
});

// Get all not pinned notes
router.get("/api/unpin/noteId", async (req, res) => {
  try {
    const notPinnedNotes = await noteSchema.find({ isPinned: false });
    res.status(200).json(notPinnedNotes);
  } catch (error) {
    console.error("Error fetching not pinned notes:", error);
    res.status(500).json({ error: "Error fetching not pinned notes" });
  }
});

// Delete a note by its ID
router.delete("/api/remove/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await noteSchema.findByIdAndDelete(noteId);

    if (deletedNote) {
      console.log("Note deleted:", deletedNote);
      res.status(200).json({ message: "Note deleted successfully" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Error deleting note" });
  }
});

// Update a note by its ID
router.put("/api/update/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const updatedNote = await noteSchema.findByIdAndUpdate(noteId, req.body, {
      new: true,
    });

    if (updatedNote) {
      console.log("Note updated:", updatedNote);
      res.status(200).json(updatedNote);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Error updating note" });
  }
});

module.exports = router;
