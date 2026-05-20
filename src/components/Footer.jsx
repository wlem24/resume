import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About</h4>
            <p>Resume Evaluator helps you improve your resume with AI-powered feedback and recommendations.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="https://sda.weclouddata.com/">About SDA</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: <a href="mailto:info@resumeevaluator.com">info@resumeevaluator.com</a></p>
            <p>Built by SDA Students</p>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" title="GitHub" aria-label="GitHub"><FaGithub /></a>
              <a href="#" title="LinkedIn" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" title="Twitter" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Resume Evaluator. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
