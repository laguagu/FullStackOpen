require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

// MongoDB
const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())

//ROUTET GET
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.get('/api', (req, res) => {
    res.send('<h1>Päivitetty!</h1>')
  })

// POST
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      console.log("Note Saved")
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})