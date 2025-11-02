// Importing 'jsonwebtoken' to work with JWT tokens (used for authentication)
const jwt = require("jsonwebtoken"); 

// Fetching the secret JWT key stored in the environment variables (.env file)
const JWT_Token = process.env.JWT_Token;

// ----------- Middleware Function: fetchMyGuy -----------
// This middleware will be used to verify the user's token (check if they are logged in)
const fetchMyGuy = (req, res, next) => {
  // Step 1️⃣: Extract token from request header
  // The client (like frontend) must send the token in the header named "auth-token"
  const token = req.header("auth-token");

  try {
    // Step 2️⃣: If no token is provided, send an error response (Unauthorized Access)
    if (!token) {
      // Return is IMPORTANT here, so the function stops executing further
      return res
        .status(401)
        .send({ error: "Please authenticate using a valid token" });
    }

    // Step 3️⃣: Verify the token using our secret key (JWT_Token)
    // If token is valid → we get the 'data' we encoded earlier (contains user's id)
    const data = jwt.verify(token, JWT_Token);

    // Step 4️⃣: Attach user data (from token) to the 'req' object
    // So that the next middleware or route can easily access the user's info
    req.user = data.user;

    // Step 5️⃣: Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Step 6️⃣: If verification fails (token expired / invalid)
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

// Exporting the middleware so it can be used in other files (like routes)
module.exports = fetchMyGuy;
