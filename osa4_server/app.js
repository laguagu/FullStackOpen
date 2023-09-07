const config = require("./utils/config");
const express = require("express");
const app = express();
const blogRouter = require("./controllers/blog");
const loginRouter = require("./controllers/login");
const logger = require("./utils/middleware");
const mongoose = require("mongoose");
require("express-async-errors");

const usersRouter = require("./controllers/users");
const mongoUrl = process.env.MONGODB_URI;

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl);

// Middlewares
app.use(express.json());
app.use(logger.info);
app.use("/api/", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);


module.exports = app;
