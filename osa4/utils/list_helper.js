const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const blogCounter = blogs.reduce((sum, blog) => sum + blog.likes, 0);
  return blogCounter / blogs.length;
};

module.exports = {
  dummy,
  totalLikes,
};
