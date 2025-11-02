// Importing required modules
const express = require("express"); // framework for backend APIs
const User = require("../models/User"); // importing User model (MongoDB)
const router = express.Router(); // router object to define routes
const { body, validationResult } = require("express-validator"); // for validation checks
const bcrypt = require("bcryptjs"); // for password hashing
const fetchMyGuy = require("../middleware/getUserDetails");
const jwt = require("jsonwebtoken"); // for generating authentication token

// 🔑 Secret JWT key (used for signing tokens)
const JWT_Token = process.env.JWT_Token;




// 🧿 ROUTE 1: Create User using POST → /api/auth/createUser
// Structure → router.post("API endpoint", "[validation checks]", "async function (Promise with try/catch)")
router.post(
  "/createUser", // API endpoint: /api/auth/createUser
  [
    // 👇 Validation checks using express-validator
    body("name", "Name must be atleast 5 characters!").isLength({ min: 5 }),
    body("email", "Enter a valid email fam").isEmail(),
    body("password", "Password must be atleast 4 characters!").isLength({
      min: 4,
    }),
  ],

  // 🔹 async function = returns a Promise
  async (req, res) => {
    // 📋 Step 1: Check if there are any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If errors exist, send bad request with all error messages
      return res.status(400).json({ errors: errors.array() });
    }

    // 🧠 Step 2: Try-Catch block to handle any server/database errors safely
    try {
      // 🔍 Step 3: Check if email already exists in DB
      // await is used because findOne() returns a Promise
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        // if user already found → stop and send response
        return res
          .status(400)
          .json({ error: "Sorry this email already exists!" });
      }

      // 🧂 Step 4: Generate salt (random string) for extra password security
      const salt = await bcrypt.genSalt(10); // await → because genSalt() is Promise-based

      // 🔒 Step 5: Hash (encrypt) password with salt
      const secretPassword = await bcrypt.hash(req.body.password, salt);

      console.log("Creating user...");

      // 🧱 Step 6: Create user in DB (MongoDB collection)
      // User.create() returns a Promise → so we await it!
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secretPassword, // never store plain text passwords!
      });

      console.log("Response sent successfully");

      // 🪄 Step 7: Create a small data object to store inside the JWT
      // we’ll only store user.id for security reasons
      const data = {
        user: {
          id: user.id,
        },
      };

      // 🪬 Step 8: Create authentication token (jwt.sign = synchronous)
      // jwt.sign() takes: (data, secret key)
      const auth_token = jwt.sign(data, JWT_Token);

      // 🕊️ Step 9: Send response back → includes token & created user
      res.json({ auth_token, user });
    } catch (err) {
      // 🧯 If something goes wrong, show error in console & send 500 status
      console.error(err.message);
      res.status(500).send("Some error occured!");
    }
  }
);





// 🧿 ROUTE 2: Login User using POST → /api/auth/login
router.post(
  "/login",
  [
    // 👇 Validation checks
    body("email", "Enter a valid email fam").isEmail(),
    body("password", "Password must not be blank").exists(),
  ],

  // 🔹 async = returns a Promise
  async (req, res) => {
    // 📋 Step 1: Check if no validation errors exist
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 🧠 Step 2: Extract email & password from request body
    const { email, password } = req.body;

    try {
      // 🔍 Step 3: Check if user exists in DB
      // await required here because findOne() is asynchronous
      let user = await User.findOne({ email });

      if (!user) {
        // If no user found → return error message
        return res
          .status(400)
          .json({ error: "Please Login with accurate credentials!" });
      }

      // 🔑 Step 4: Compare entered password with hashed password in DB
      // bcrypt.compare() → async → returns true/false → hence we await
      const compare_password = await bcrypt.compare(password, user.password);

      // ❌ If password mismatch
      if (!compare_password) {
        return res
          .status(400)
          .json({ error: "Please Login with accurate credentials!" });
      }

      // ✅ Step 5: If correct password, create data payload for JWT
      const data = {
        user: {
          id: user.id,
        },
      };

      // 🪬 Step 6: Sign and create JWT token
      const auth_token = jwt.sign(data, JWT_Token);

      // 🎁 Step 7: Send token as response (can be stored in frontend localStorage)
      res.json({ auth_token });
    } catch (err) {
      // 🧯 Handle any server-side errors
      console.error(err.message);
      res.status(500).send("Internal Server Issue");
    }
  }
);







// 🧿 ROUTE 3: Fetch User details using POST → /api/auth/fetchUser
// Protected route → requires valid token (middleware: fetchMyGuy)
router.post("/fetchUser", fetchMyGuy, async (req, res) => {
  try {
    // 🪄 Step 1: Extract user ID from token (set earlier by middleware)
    const userId = req.user.id;

    // 🧠 Step 2: Find user in MongoDB using their ID
    // .select("-password") means → don’t send password in the response
    const user = await User.findById(userId).select("-password");

    // 🕊️ Step 3: Send user details as response
    res.send(user);
  } catch (err) {
    // 🧯 Step 4: Handle any unexpected server/database errors
    console.error(err.message);
    res.status(500).send("Some error occurred!");
  }
});





// 🩵 Exporting router to use in index.js
module.exports = router;
