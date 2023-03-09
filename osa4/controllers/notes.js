const blogRouter = require("express").Router();
const Blog = require("../models/blog");

//ROUTET GET
blogRouter.get("/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.get("/", (req, res) => {
  res.send("<h1>Päivitetty!</h1>");
});

// POST
blogRouter.post("/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    console.log("Note Saved");
    response.status(201).json(result);
  });
});

module.exports = blogRouter;
