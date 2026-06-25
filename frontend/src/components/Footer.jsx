import { Link } from 'react-router-dom';
import '../styles/footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">BookEase</div>
          <p>Your smart online appointment booking system. Easy, fast, and secure scheduling for all services.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/book">Book Appointment</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>Email: support@bookease.com</p>
          <p>Phone: +1 (555) 019-2834</p>
          <p>Address: 100 Ease Way, Suite A, San Francisco, CA 94107</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {currentYear} BookEase. All rights reserved.
      </div>
    </footer>
  );
}
