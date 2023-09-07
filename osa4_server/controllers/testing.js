const router = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

// POST route to reset the database
router.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

// GET route to check the status or for manual testing
router.get("/reset", (request, response) => {
  response.status(200).send("Reset route is working!!");
});

module.exports = router;