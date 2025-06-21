// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/auth.route.js";
// import userRoutes from "./routes/user.route.js";
// import chatRoutes from "./routes/chat.route.js";

// // import aiChatRoutes from "./routes/aiChat.route.js";
// import { connectDB } from "./lib/db.js";
// import cookieParser from "cookie-parser";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(cookieParser());


// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes)
// app.use("/api/chat", chatRoutes)
           

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   connectDB();
// });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// import path from "path";  

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

// ✅ AI Chat START – import the new route
import aiChatRoutes from "./routes/aiChat.route.js";
// ✅ AI Chat END

import translateRoutes from "./routes/translate.routes.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
// const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ AI Chat START – mount per‑user AI chat endpoints
app.use("/api/ai-chat", aiChatRoutes);
// ✅ AI Chat END
app.use("/api/translate", translateRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});



