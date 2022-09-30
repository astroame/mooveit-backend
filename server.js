import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";

// Importing local modules
import errorHandler from "./middlewares/errorHandler.js";
import connectDB from "./config/db.config.js";

dotenv.config();

// Initialize app
const app = express();

// CONNECTING APP TO DATABASE
connectDB();

// Importing routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// Set up CORS
app.use(cors());

// Enable pre-flight
app.options("*", cors());

// Set up public folder
app.use(express.static("public"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Express json middleware
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Set Security Headers
app.use(helmet());

// Prevent Cross Site Scripting (XSS) Attacks
app.use(xss());

// Prevent http params pollution
app.use(hpp());

// Register routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes)

// Error Handling
app.use(errorHandler);

// Setting up our server to listen to assigned PORT
app.listen(process.env.PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
);

// GLOBAL CONFIG TO HANDLE ALL UNHANDLED PROMISE REJECTIONS
// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`)
//   server.close(() => process.exit(1))
// })
