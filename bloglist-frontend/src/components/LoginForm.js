const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return(
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required/>
        </div>
        <div>
          Password
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required/>
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </>
  )
};

export default LoginForm