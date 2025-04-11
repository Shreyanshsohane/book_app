// LoginPage.jsx
import React, { useState } from "react";
import "./LoginPage.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please login to your account</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <i className="icon email-icon"></i>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <i className="icon password-icon"></i>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className={`password-toggle ${showPassword ? "visible" : ""}`}
                onClick={() => setShowPassword(!showPassword)}
              ></button>
            </div>
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input id="remember-me" type="checkbox" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="login-button">
            Sign in
          </button>

          <div className="social-divider">
            <span>Or continue with</span>
          </div>

          <div className="social-login">
            <button type="button" className="social-button twitter"></button>
            <button type="button" className="social-button github"></button>
            <button type="button" className="social-button google"></button>
          </div>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
