import { useState } from "react";

const BlogForm = ({ onSubmit }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    onSubmit(blogObject);
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <h2>Create New</h2>
        title:
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
          placeholder="title"
          id="title"
        />
      </div>
      <div>
        author:
        <input
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          required
          placeholder="author"
          id="author"
        />
      </div>
      <div>
        url:
        <input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          required
          placeholder="url"
          id="url"
        />
      </div>
      <button id="createButton" type="submit">Create</button>
    </form>
  );
};

export default BlogForm;
