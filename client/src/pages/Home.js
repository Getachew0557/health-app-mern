import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Service from './Service';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'service', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-brand">DocCare</div>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a onClick={() => scrollToSection('home')} 
             className={activeSection === 'home' ? 'active' : ''}>
            Home
          </a>
          <a onClick={() => scrollToSection('about')} 
             className={activeSection === 'about' ? 'active' : ''}>
            About
          </a>
          <a onClick={() => scrollToSection('service')} 
             className={activeSection === 'service' ? 'active' : ''}>
            Services
          </a>
          <a onClick={() => scrollToSection('contact')} 
             className={activeSection === 'contact' ? 'active' : ''}>
            Contact
          </a>
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="register-btn">Register</Link>
          </div>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Welcome to DocCare</h1>
          <p>Your Health, Our Priority</p>
          <div className="cta-buttons">
            <Link to="/register" className="primary-btn">Get Started</Link>
            <a onClick={() => scrollToSection('about')} className="secondary-btn">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="about">
        <About/>
      </section>

      <section id="service">
        <Service/>
      </section>

      <section id="contact">
        <Contact />
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}

export default Home;
