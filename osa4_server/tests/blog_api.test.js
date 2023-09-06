const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const helper = require("./test_helper");

const Blog = require("../models/blog");
const User = require("../models/user");
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

// USER TEST
describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();
    console.log("KÄYTTÄJIÄ ALUSSA", usersAtStart);
    const newUser = {
      username: "Aku",
      name: "Aku Legolas",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    console.log("KÄYTTÄJIÄ LOPUSSA", usersAtEnd);
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  // test('creation fails with proper statuscode and message if username already taken', async () => {
  //   const usersAtStart = await helper.usersInDb()

  //   const newUser = {
  //     username: 'root',
  //     name: 'Superuser',
  //     password: 'salainen',
  //   }

  //   const result = await api
  //     .post('/api/users')
  //     .send(newUser)
  //     .expect(400)
  //     .expect('Content-Type', /application\/json/)

  //   expect(result.body.error).toContain('expected `username` to be unique')

  //   const usersAtEnd = await helper.usersInDb()
  //   expect(usersAtEnd).toHaveLength(usersAtStart.length)
  // })
});

afterAll(async () => {
  await mongoose.connection.close();
});
