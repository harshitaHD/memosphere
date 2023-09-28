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
router.get("/", async (req, res) => {
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
    const noteId = req.params.noteId;
    const noteToUpdate = await noteSchema.findById(noteId);

    if (!noteToUpdate) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Toggle the isPinned status
    noteToUpdate.isPinned = !noteToUpdate.isPinned;
    const updatedNote = await noteToUpdate.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Error toggling pin" });
  }
});

// Get all not pinned notes
router.get("/api/unpin/:noteId", async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const noteToUpdate = await noteSchema.findById(noteId);

    if (!noteToUpdate) {
      return res.status(404).json({ message: "Note not found" });
    }

    noteToUpdate.isPinned = false;
    const updatedNote = await noteToUpdate.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error toggling pin:", error);
    res.status(500).json({ error: "Error toggling pin" });
  }
});

// Delete a note by its ID
router.delete("/api/remove/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await noteSchema.findByIdAndDelete(noteId);

    if (deletedNote) {
      res.status(200).json({ message: "Note deleted successfully" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Error deleting note" });
  }
});

router.get("/api/get/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await noteSchema.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Error fetching note" });
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
      res.status(200).json(updatedNote);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating note" });
  }
});

module.exports = router;
