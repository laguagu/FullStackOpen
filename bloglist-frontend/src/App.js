import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "./index.css";

const Message = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="message">{message}</div>;
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const loginForm = () => (
    <>
      <Notification message={errorMessage} />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        Username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
          Password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewTitle("");
      setNewUrl("");
      setNewAuthor("");
      setMessage(`Added ${newTitle} by ${newAuthor}`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    });
  };

  const BlogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <h2>Create New</h2>
        title:
        <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        author:
        <input
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
      </div>
      <div>
        url:
        <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
  );

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  if (user === null) {
    return <div>{loginForm()}</div>;
  }

  return (
    <main>
      <>
        <h2>Blogs</h2>
        <Message message={message} />
        <div>
          {user.username} logged in
          <button onClick={() => logout()}>Logout</button>
        </div>
        {BlogForm()}
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    </main>
  );
};

export default App;
