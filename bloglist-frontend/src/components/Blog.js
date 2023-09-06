import React from "react";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import PropTypes from "prop-types"


const Blog = ({ blog, blogs, setBlogs, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async () => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    console.log("Päivitetty",updatedBlog)
    const updatedBlogs = blogs.map((b) =>
      b.id === updatedBlog.id ? updatedBlog : b
    );
    setBlogs(updatedBlogs);
  };

  const showDeleteButton = () => {
    if (user && blog.user && user.username === blog.user.username) {
      return (
        <button onClick={() => removeBlog(blog.id)}>delete</button>
      );
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <Togglable buttonLabel="view">
          <div>
            <p>{blog.url}</p>
            <p>
              likes {blog.likes} <button onClick={handleLike}>like</button>
            </p>
            {showDeleteButton()}
          </div>
        </Togglable>
      </div>
    </div>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Blog;