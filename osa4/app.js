const express = require('express')
const app = express()
// UTILS
const config = require('./utils/config')
const logger= require('./utils/middleware')
// Middlewares
app.use(express.json())
app.use(logger.info)


module.exports = app