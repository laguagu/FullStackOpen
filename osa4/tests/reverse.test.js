const listHelper = require("../utils/list_helper").dummy;
const blogCounter = require("../utils/list_helper").totalLikes;
const favoriteBlog = require("../utils/list_helper").favoriteBlog;

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper(blogs);
  expect(result).toBe(1);
});

describe("Total likes", () => {
  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];
  const result = blogCounter(blogs);

  test("Avarage blog likes", () => {
    expect(result).toBe(6);
  });

  test("Avarage blog likes with one blog", () => {
    const result = blogCounter([blogs[0]]);
    expect(result).toBe(7);
  });

  test("Empty blog list", () => {
    expect(blogCounter([])).toBe(0);
  });
});

describe("Favorite blog", () => {
  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];
  test("Most likes blog", () => {
    bestBlog = favoriteBlog(blogs);
    expect(bestBlog.title).toEqual(blogs[0].title);
  });
});
