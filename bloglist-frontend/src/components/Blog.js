import React from "react";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, setBlogs, removeBlog, user }) => {
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
    console.log("Päivitetty", updatedBlog);
    setBlogs((prevBlogs) =>
      prevBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
    );
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;