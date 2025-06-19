// import jwt from "jsonwebtoken";
// import User from "../models/User.js";   

// export const protectRoute = async (req, res, next) => { 
//     try {
//         const token = req.cookies.jwt
//         if (!token) {
//             return res.status(401).json({ message: "Unauthorized access" });
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         if(!decoded){
//             return res.status(401).json({ message: "Unauthorized access-invalid token" });
//         }
//         const user = await User.findById(decoded.userId).select("-password ");
//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized access - user not found" });
//         }

//         req.user = user; // Attach user to request object
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         console.error("Error in protectRoute middleware:", error);
//         return res.status(500).json({ message: "Internal server error" });
        
//     }
// }

// Import the jsonwebtoken library to verify JWTs
// import jwt from "jsonwebtoken";

// // Import the User model to fetch user details from the database
// import User from "../models/User.js";   

// // Middleware to protect routes — allows only authenticated users
// export const protectRoute = async (req, res, next) => { 
//     try {
//         // 1. Get the JWT token from browser cookies
//         const token = req.cookies.jwt;

//         // 2. If no token is found, block access
//         if (!token) {
//             return res.status(401).json({ message: "Unauthorized access" });
//         }

//         // 3. Verify the token using the secret key (throws error if invalid/expired)
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//         // 4. If verification fails (very rare here since verify throws), block access
//         if (!decoded) {
//             return res.status(401).json({ message: "Unauthorized access - invalid token" });
//         }

//         // 5. Find the user from the database using ID in token payload, exclude password
//         const user = await User.findById(decoded.userId).select("-password");

//         // 6. If user not found in DB, block access
//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized access - user not found" });
//         }

//         // 7. Attach user info to request object so next middleware or route can use it
//         req.user = user;

//         // 8. Continue to next middleware or route handler
//         next(); 
//     } catch (error) {
//         // 9. If any error occurs (e.g., token expired, invalid format), log it and respond
//         console.error("Error in protectRoute middleware:", error);

//         // Check for specific token expiration error
//         if (error.name === "TokenExpiredError") {
//             return res.status(401).json({ message: "Session expired. Please log in again." });
//         }

//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// src/middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Protect routes — only allow requests that carry a valid JWT.
 * Adds the authenticated user object to req.user if successful.
 */
export const protectRoute = async (req, res, next) => {
  try {
    // 1️⃣  Get token from cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized access – no token provided" });
    }

    // 2️⃣  Verify token (isolated try/catch to separate token errors)
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      // Token‑specific errors
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Session expired. Please log in again." });
      }
      if (err.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ message: "Invalid token. Please log in again." });
      }
      // Any other verification error
      return res
        .status(401)
        .json({ message: "Unauthorized – token verification failed" });
    }

    // 3️⃣  Look up the user (omit password field)
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized access – user not found" });
    }

    // 4️⃣  Attach user to request and proceed
    req.user = user;
    next();
  } catch (error) {
    // 5️⃣  Catch‑all for unexpected errors (DB issues, etc.)
    console.error("Error in protectRoute middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


