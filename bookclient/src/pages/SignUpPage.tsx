// SignupPage.jsx
import React, { useState } from "react";
import "./SignupPage.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "owner"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    const userData = {
      name: formData.name,
      mobileNumber: formData.mobileNumber,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };
    
    console.log("User registered:", userData);
    alert("Registration successful!");
    // Here you would typically send this data to your backend
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Header */}
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Sign up to get started</p>
        </div>

        {/* Form */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-with-icon">
              <i className="icon user-icon"></i>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <div className="input-with-icon">
              <i className="icon phone-icon"></i>
              <input
                id="mobile"
                name="mobileNumber"
                type="tel"
                placeholder="Enter your mobile number"
                required
                value={formData.mobileNumber}
                onChange={handleChange}
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <i className="icon email-icon"></i>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <i className="icon password-icon"></i>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                required
                value={formData.password}
                onChange={handleChange}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Password must contain at least 8 characters, including uppercase, lowercase, number and special character"
              />
              <button
                type="button"
                className={`password-toggle ${showPassword ? "visible" : ""}`}
                onClick={() => setShowPassword(!showPassword)}
              ></button>
            </div>
            <div className="password-strength-info">
              Password must be at least 8 characters with uppercase, lowercase, number and special character
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-with-icon">
              <i className="icon password-icon"></i>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className={`password-toggle ${showConfirmPassword ? "visible" : ""}`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              ></button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <div className="role-selector">
              <label className={`role-option ${formData.role === "owner" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="owner"
                  checked={formData.role === "owner"}
                  onChange={handleChange}
                />
                <div className="role-option-content">
                  <div className="role-icon owner-icon"></div>
                  <div className="role-label">Owner</div>
                </div>
              </label>
              <label className={`role-option ${formData.role === "tenant" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="tenant"
                  checked={formData.role === "tenant"}
                  onChange={handleChange}
                />
                <div className="role-option-content">
                  <div className="role-icon tenant-icon"></div>
                  <div className="role-label">Tenant</div>
                </div>
              </label>
              <label className={`role-option ${formData.role === "agent" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="agent"
                  checked={formData.role === "agent"}
                  onChange={handleChange}
                />
                <div className="role-option-content">
                  <div className="role-icon agent-icon"></div>
                  <div className="role-label">Agent</div>
                </div>
              </label>
            </div>
          </div>

          <div className="form-group terms">
            <div className="terms-check">
              <input id="terms" type="checkbox" required />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>
          </div>

          <button type="submit" className="signup-button">
            Create Account
          </button>

          <div className="social-divider">
            <span>Or sign up with</span>
          </div>

          <div className="social-login">
            <button type="button" className="social-button google"></button>
            <button type="button" className="social-button facebook"></button>
            <button type="button" className="social-button apple"></button>
          </div>
        </form>

        {/* Footer */}
        <div className="signup-footer">
          <p>
            Already have an account? <a href="#">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;