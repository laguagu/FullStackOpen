const config = require("./utils/config");
const express = require("express");
const app = express();
const blogRouter = require("./controllers/notes");
const logger = require("./utils/middleware");
const mongoose = require("mongoose");

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
mongoose.set('strictQuery', false)

// Middlewares
app.use(express.json());
app.use(logger.info);
app.use("/api/", blogRouter);

module.exports = app;
