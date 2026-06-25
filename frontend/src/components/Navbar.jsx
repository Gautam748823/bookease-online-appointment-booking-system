import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          BookEase
        </NavLink>
        <button 
          className="navbar-toggle" 
          onClick={toggleMenu} 
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          ☰
        </button>
        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <NavLink to="/" className="navbar-link" end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/book" className="navbar-link" onClick={closeMenu}>
            Book Appointment
          </NavLink>
          <NavLink to="/about" className="navbar-link" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/contact" className="navbar-link" onClick={closeMenu}>
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
