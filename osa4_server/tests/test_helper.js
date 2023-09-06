const Blog = require('../models/blog')
const User = require('../models/user')

const blogsInDb = async () => {
    const blog = await Blog.find({})
    return blog.map(post => post.toJSON())
  }

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

  module.exports = {
    blogsInDb,
    usersInDb
  }