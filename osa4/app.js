const config = require("./utils/config");
const express = require("express");
require('express-async-errors')
const app = express();
const blogRouter = require("./controllers/blog");
const logger = require("./utils/middleware");
const mongoose = require("mongoose");

const mongoUrl = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(mongoUrl)

// Middlewares
app.use(express.json());
app.use(logger.info);
app.use("/api/", blogRouter);

module.exports = app;
