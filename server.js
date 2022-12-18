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
import errorHandler from "./src/middlewares/errorHandler.js";
import connectDB from "./src/config/db.config.js";

dotenv.config();

// Initialize app
const app = express();

// CONNECTING APP TO DATABASE
connectDB();

// Importing routes
import authRoutes from "./src/routes/admin.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import partnerRoutes from "./src/routes/partners.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import driversRoutes from "./src/routes/drivers.routes.js";
import configurationsRoutes from "./src/routes/configurations.routes.js";

// Set up CORS
app.use(cors());

// Enable pre-flight
app.options("*", cors());

// Set up public folder
app.use(express.static("src/public"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Express json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/listings", partnerRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/drivers", driversRoutes);
app.use("/api/v1/configurations", configurationsRoutes);

// Error Handling
app.use(errorHandler);

// Setting up our server to listen to assigned PORT
app.listen(process.env.PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)
);
