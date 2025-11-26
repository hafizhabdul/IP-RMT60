if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

// Security & Performance Middleware
app.use(helmet()); // Secure HTTP headers
app.use(compression()); // Compress responses

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173", // Allow your frontend origin
  credentials: true, // Allow cookies/credentials
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
//middleware body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SNS NDT Learning Platform API");
});

// API routes
app.use("/api", routes);

// Error handler middleware
app.use(errorHandler);

// Add more detailed error logging
app.use((err, req, res, next) => {
  console.error("Error details:", err);
  next(err);
});

// Only listen if directly running this file (not in test environment)
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`SNS NDT Learning Platform API listening on port ${port}`);
  });
}

module.exports = app;
