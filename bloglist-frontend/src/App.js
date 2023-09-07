import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import "./index.css";
import Togglable from "./components/Togglable";

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

  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // järjestetään blogit likes-määrän mukaiseen suuruusjärjestykseen
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

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

  //Blogin lisäys
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setMessage(`Added ${newTitle} by ${newAuthor}`);
      setBlogs(blogs.concat(returnedBlog));
      setNewTitle("");
      setNewUrl("");
      setNewAuthor("");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    });
  };

  //BLOGIN POISTO
  const removeBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
      } catch (exception) {
        setErrorMessage("Failed to delete the blog");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };
  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };


  const loginForm = () => {
    return (
      <div>
        <Notification message={errorMessage} />
        <h1>Blogg App</h1>

        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Togglable>
      </div>
    );
  };

  if (user === null) {
    return <div>{loginForm()}</div>;
  }

  return (
    <main>
      <>
        <h2>Blogs</h2>
        <Notification message={errorMessage} />
        <Message message={message} />
        <div>
          {user.username} logged in
          <button onClick={() => logout()}>Logout</button>
        </div>
        <Togglable buttonLabel="Add new post" ref={blogFormRef}>
          <BlogForm onSubmit={addBlog} />
        </Togglable>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} removeBlog={removeBlog} user={user} />
        ))}
      </>
    </main>
  );
};

export default App;
