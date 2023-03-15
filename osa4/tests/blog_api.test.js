const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const blog = require("../models/blog");
const Blog = require("../models/blog");

// const api = supertest(app);
const api = supertest(`http://localhost:3003`);

describe("Blog post tests", () => {
  test("Blog posts sum match length of blogs ", async () => {
    const response = await api.get("/api/blogs").expect(200);
    expect(response.body).toHaveLength(response.body.length);
  });

  test("ID field identifier blogs", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    blogs.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test("blogs can be added", async () => {
    const newBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "https://testurl.com",
      likes: 5,
    };
    const initialResponse = await api.get("/api/blogs");
    const initialBlogs = initialResponse.body.length;
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((blog) => blog.title);

    expect(response.body).toHaveLength(initialBlogs + 1);
    expect(titles).toContain("Test Blog");
  });
});

describe("Check blog post likes", () => {
  test("If the number of likes is not indicated, set it to 0", async () => {
    const newBlog = {
      title: "Zero likes",
      author: "Zero",
      url: "https://Zero.com",
    };

    const response = await api.post("/api/blogs").send(newBlog);
    expect(response.status).toBe(201);
    expect(response.body.likes).toBe(0);
  });
});

describe("Blog delete", () => {
  test("Delete blog post with status code 204 if id is valid", async () => {
    const post = await Blog.find({});
    const postToDelete = post[0];
    console.log(post);

    await api.delete(`/api/blogs/${postToDelete.id}`).expect(204);

    const blogsAtEnd = await Blog.find({});
    console.log("Deletet");
    expect(blogsAtEnd).toHaveLength(post.length - 1);

  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
