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

// Rate Limiting (skip in development to avoid blocking local dev refresh storms)
const isDev = process.env.NODE_ENV !== "production";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? 10000 : 300, // Generous in dev; 300/15min in prod (~20 req/min/IP)
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again after 15 minutes",
  skip: (req) => {
    // Always skip for localhost during dev
    if (isDev) return true;
    return false;
  },
});
app.use(limiter);

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://sarndtservices.com",
  "https://www.sarndtservices.com"
];

if (process.env.CLIENT_URL) {
  // Avoid duplicates if CLIENT_URL is already in the list
  if (!allowedOrigins.includes(process.env.CLIENT_URL)) {
    allowedOrigins.push(process.env.CLIENT_URL);
  }
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies/credentials
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization", "Accept-Language"], // Allowed headers
};

app.use(cors(corsOptions));
//middleware body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10kb' }));

app.get("/", (req, res) => {
  res.send("SNS NDT Learning Platform API");
});

// API routes
app.use("/api", routes);

// Error handler middleware
app.use(errorHandler);

// Only listen if directly running this file (not in test environment)
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`SNS NDT Learning Platform API listening on port ${port}`);
  });
}

module.exports = app;
