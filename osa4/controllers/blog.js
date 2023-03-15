const blogRouter = require("express").Router();
const Blog = require("../models/blog");

//ROUTET GET
blogRouter.get("/", async (request, response) => {
  const blog_post = await Blog.find({});
  console.log("operation returned the following notes", blog_post);
  response.json(blog_post);
});

blogRouter.get("/blogs", async (request, response) => {
  const blog_post = await Blog.find({});
  response.json(blog_post);
});

blogRouter.get("/", (req, res) => {
  res.send("<h1>Päivitetty!</h1>");
});

blogRouter.get('/blogs/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

// POST
blogRouter.post("/blogs", async (request, response) => {
  console.log(request.body)
  const blog = new Blog(request.body);
  if (!blog.likes) {
    blog.likes = 0;
  }

  const result = await blog.save();
  console.log("Note Saved");
  response.status(201).json(result);
});

// DELETE
blogRouter.delete("/blogs/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
});


module.exports = blogRouter;
