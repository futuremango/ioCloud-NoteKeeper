// 📂 Importing required modules
const express = require("express");
const router = express.Router();
const fetchMyGuy = require("../middleware/getUserDetails"); // 🧿 Custom middleware to fetch user details using JWT
const Note = require("../models/Notes"); // 🧿 MongoDB model for Notes collection
const { body, validationResult } = require("express-validator"); // 🧿 For input validation (title, description length etc.)

// ==========================================================
// SECTION - ROUTE 1: Fetch all notes for a specific user
// ==========================================================
// METHOD: GET
// ENDPOINT: /api/notes/fetchAllnotes
// ACCESS: Login Required (Authenticated via fetchMyGuy middleware)
//
//NOTE - Purpose:
// → When a user is logged in, this route will fetch all notes that belong
//   to that specific user's ID from MongoDB.
// ==========================================================
router.get("/fetchAllnotes", fetchMyGuy, async (req, res) => {
  try {
    // 🔹 Find all notes where "user" field matches the logged-in user's ID
    const Fetchednotes = await Note.find({ user: req.user.id });

    // 🔹 Send all fetched notes back as JSON response
    res.json(Fetchednotes);
  } catch (err) {
    // 🧯 Handle any unexpected server-side errors
    console.error(err.message);
    res.status(500).send("Internal Server Issue");
  }
});

// ==========================================================
// SECTION - ROUTE 2: Add a new note to the database
// ==========================================================
// METHOD: POST
// ENDPOINT: /api/notes/addNote
// ACCESS: Login Required (Authenticated via fetchMyGuy middleware)
//
// NOTE - Purpose:
// → This route allows a logged-in user to create a new note.
//   It first validates the input using express-validator,
//   then saves the note to MongoDB with the user's ID linked to it.
// ==========================================================
router.post(
  "/addNote",
  fetchMyGuy,
  [
    // ✅ Validation Rules for Note fields
    body("title", "Please Enter a valid Title!").isLength({ min: 2 }),
    body("description", "Description must be atleast 5 characters!").isLength({
      min: 5,
    }),
    body("tag", "Please Enter a valid Tag!").isLength({ min: 2 })
  ],
  async (req, res) => {
    try {
      // 🧾 Step 1: Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // 🚫 If any validation fails, send 400 Bad Request with all error details
        return res.status(400).json({ errors: errors.array() });
      }

      // 🧾 Step 2: Extract note details from request body
      const { title, description, tag } = req.body;

      // 🧾 Step 3: Create a new Note instance using the model
      // "req.user.id" → automatically fetched from JWT token by fetchMyGuy middleware
      const addnote = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // 🧾 Step 4: Save the new note to MongoDB
      const saveNote = await addnote.save();

      // 🧾 Step 5: Return saved note as JSON response
      res.json(saveNote);
    } catch (err) {
      // 🧯 Handle any unexpected server-side errors
      console.error(err.message);
      res.status(500).send("Internal Server Issue");
    }
  }
);

// ==========================================================
// SECTION - ROUTE 3: Update an existing note
// ==========================================================
// METHOD: PUT
// ENDPOINT: /api/notes/updateNote/:id
// ACCESS: Login Required (Authenticated via fetchMyGuy middleware)
//
// NOTE - Purpose:
// → Allows a user to update their existing note by ID.
//   Only the owner of that note (verified via JWT) can modify it.
// ==========================================================
router.put("/updateNote/:id", fetchMyGuy, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // 🧾 Step 1: Create a new object that stores the fields to update
    // This helps avoid overwriting existing fields with undefined values.
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // 🧾 Step 2: Find the note that needs to be updated by its ID
    let note = await Note.findById(req.params.id);

    // 🚫 If note doesn’t exist, return a 404 error
    if (!note) {
      return res.status(404).send("Note Not Found!");
    }

    // 🚫 Step 3: Ensure the note belongs to the logged-in user
    // If another user tries to update someone else’s note → deny access
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed my guy!");
    }

    // ✅ Step 4: Update the note using MongoDB’s findByIdAndUpdate method
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true } // new:true returns the updated document
    );

    // ✅ Step 5: Send updated note as response
    res.json(note);
  } catch (err) {
    // 🧯 Handle any unexpected errors gracefully
    console.error(err.message);
    res.status(500).send("Internal Server Issue");
  }
});

// ==========================================================
// SECTION - ROUTE 4: Delete a note
// ==========================================================
// METHOD: DELETE
// ENDPOINT: /api/notes/deleteNote/:id
// ACCESS: Login Required (Authenticated via fetchMyGuy middleware)
//
// NOTE - Purpose:
// → Allows a user to delete their existing note by ID.
//   Only the owner of that note (verified via JWT) can modify it.
// ==========================================================
router.delete("/deleteNote/:id", fetchMyGuy, async (req, res) => {
  try {

    // 🧾 Step 1: Find the note that needs to be deleted by its ID
    let note = await Note.findById(req.params.id);

    // 🚫 If note doesn’t exist, return a 404 error
    if (!note) {
      return res.status(404).send("Note Not Found!");
    }

    //Step 2: Ensure the note belongs to the logged-in user
    // If another user tries to update someone else’s note → deny access
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed my guy!");
    }

    // Step 3: Delete the note using MongoDB’s findByIdAndDelete method
    note = await Note.findByIdAndDelete(req.params.id);

    //Step 4: Send Success as response
    res.json({"Success":"Note has been deleted successfully!"});
  } catch (err) {
    // 🧯 Handle any unexpected errors gracefully
    console.error(err.message);
    res.status(500).send("Internal Server Issue");
  }
});

// ==========================================================
// 📤 Exporting the router
// ==========================================================
// 🧠 This allows the routes to be imported and used in index.js
// (main backend entry file) as: app.use("/api/notes", require("./routes/notes"))
// ==========================================================
module.exports = router;
