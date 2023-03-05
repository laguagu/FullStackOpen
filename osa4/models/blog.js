const mongoose = require('mongoose')
const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)
mongoose.set('strictQuery', false)

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
//   Poistaa ei halutut kentät
  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

// const Blog = mongoose.model('Blog', blogSchema)
  
module.exports = mongoose.model('Blog', blogSchema)