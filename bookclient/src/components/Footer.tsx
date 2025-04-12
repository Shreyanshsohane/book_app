import React from "react";
import "./Footer.css";
const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Company</h3>
          <ul className="footer-links">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Product</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Solutions</a>
            </li>
            <li>
              <a href="#">Resources</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Support</h3>
          <ul className="footer-links">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Status</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Connect</h3>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557...z" />
              </svg>
            </a>
            <a href="#" className="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.675 0...z" />
              </svg>
            </a>
            <a href="#" className="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163...z" />
              </svg>
            </a>
            <a href="#" className="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184...z" />
              </svg>
            </a>
            <a href="#" className="social-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14...z" />
              </svg>
            </a>
          </div>
          <div className="newsletter">
            <h4>Subscribe to our newsletter</h4>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container footer-bottom-content">
          <p className="copyright">
            &copy; {currentYear} Your Company. All rights reserved.
          </p>
          <div className="legal-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
