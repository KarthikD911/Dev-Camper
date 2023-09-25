const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const fileupload = require("express-fileupload");
const errorHandler = require("./Middleware/error");

// morgan for dev logging
const morgan = require("morgan");

// lode env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Router files
const bootcamps = require("./Routes/bootcamps");
const courses = require("./Routes/courses");

// Starting express
const app = express();

// Parsing the Body (we can also use body-parser but this does the same work)
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount Router
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

// Handeling Errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle un handeled rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
