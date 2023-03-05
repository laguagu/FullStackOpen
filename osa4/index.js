const app = require('./app')
const config = require('./utils/config')
// MONGODB
const Blog = require('./models/blog')



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

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})