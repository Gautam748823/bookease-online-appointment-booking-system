import { Link } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
  return (
    <div>
      <section className="hero-section">
        <h1>Your Smart Appointment Scheduling Solution</h1>
        <p>Book online seamlessly with BookEase. Choose your required service, select a convenient date and time slot, and get instant confirmation.</p>
        <Link to="/book" className="btn-primary">
          Book Appointment
        </Link>
      </section>

      <section>
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>General Consultation</h3>
            <p>Schedule a routine appointment or follow-up with our expert professionals.</p>
          </div>
          <div className="service-card">
            <h3>Dental Care</h3>
            <p>Complete dental checkups, cleaning, and professional consultations.</p>
          </div>
          <div className="service-card">
            <h3>Eye Care</h3>
            <p>Vision checks, eye examinations, and guidance on vision solutions.</p>
          </div>
          <div className="service-card">
            <h3>Health Checkup</h3>
            <p>Comprehensive health screening package tailored for you.</p>
          </div>
        </div>
      </section>

      <section className="why-section">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="why-grid">
          <div className="why-card">
            <h3>Professional Staff</h3>
            <p>Highly qualified and certified specialists ready to assist you.</p>
          </div>
          <div className="why-card">
            <h3>Easy Booking</h3>
            <p>A few simple clicks to schedule or manage your slot anytime.</p>
          </div>
          <div className="why-card">
            <h3>Trusted Service</h3>
            <p>Committed to providing premium care with zero compromises.</p>
          </div>
          <div className="why-card">
            <h3>Fast Confirmation</h3>
            <p>Instant scheduling updates with immediate confirmations.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Book Your Slot?</h2>
        <p>Schedule your professional care service with us today in under 2 minutes.</p>
        <Link to="/book" className="btn-primary">
          Book Appointment
        </Link>
      </section>
    </div>
  );
}
