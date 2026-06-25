import '../styles/contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <div className="container-card">
        <div className="contact-info-list">
          <div className="contact-info-item">
            <h3>Phone Number</h3>
            <p>+1 (555) 019-2834</p>
          </div>

          <div className="contact-info-item">
            <h3>Email Address</h3>
            <p>support@bookease.com</p>
          </div>

          <div className="contact-info-item">
            <h3>Office Address</h3>
            <p>100 Ease Way, Suite A, San Francisco, CA 94107</p>
          </div>

          <div className="contact-info-item">
            <h3>Working Hours</h3>
            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p>Saturday: 9:00 AM - 3:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
