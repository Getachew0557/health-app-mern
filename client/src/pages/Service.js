import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Service.css';

const Service = () => {
  const [activeService, setActiveService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
    setIsLoading(false);
  }, []);

  const handleAppointment = () => {
    navigate('/login');
  };

  const services = [
    {
      id: 1,
      icon: "fas fa-user-md",
      title: "Primary Care",
      description: "Comprehensive healthcare for your family",
      details: [
        "Regular check-ups",
        "Preventive care",
        "Health screenings",
        "Immunizations"
      ]
    },
    {
      id: 2,
      icon: "fas fa-heartbeat",
      title: "Cardiology",
      description: "Expert heart care services",
      details: [
        "Heart disease treatment",
        "ECG testing",
        "Cardiac rehabilitation",
        "Blood pressure management"
      ]
    },
    {
      id: 3,
      icon: "fas fa-brain",
      title: "Neurology",
      description: "Advanced neurological care",
      details: [
        "Neurological disorders",
        "Brain mapping",
        "Spine treatment",
        "Movement disorders"
      ]
    },
    {
      id: 4,
      icon: "fas fa-child",
      title: "Pediatrics",
      description: "Specialized care for children",
      details: [
        "Child wellness visits",
        "Vaccinations",
        "Growth monitoring",
        "Behavioral health"
      ]
    },
    {
      id: 5,
      icon: "fas fa-procedures",
      title: "Surgery",
      description: "State-of-the-art surgical care",
      details: [
        "Minimally invasive surgery",
        "General surgery",
        "Orthopedic surgery",
        "Post-operative care"
      ]
    },
    {
      id: 6,
      icon: "fas fa-stethoscope",
      title: "Diagnostics",
      description: "Advanced medical diagnostics",
      details: [
        "Laboratory testing",
        "Imaging services",
        "Genetic testing",
        "Preventive screenings"
      ]
    }
  ];

  const handleServiceClick = (id) => {
    setActiveService(activeService === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    );
  }

  return (
    <div className="service-section" id="services">
      <div className="service-container">
        <div className="service-header" data-aos="fade-up">
          <h2>Our Services</h2>
          <div className="header-underline"></div>
          <p className="service-subtitle">
            Comprehensive Healthcare Solutions for Your Well-being
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card ${activeService === service.id ? 'active' : ''}`}
              onClick={() => handleServiceClick(service.id)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-details">
                <ul>
                  {service.details.map((detail, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check-circle"></i>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="learn-more-btn">
                {activeService === service.id ? 'Show Less' : 'Learn More'}
              </button>
            </div>
          ))}
        </div>

        <div className="service-cta" data-aos="fade-up">
          <h3>Need Medical Assistance?</h3>
          <p>Our healthcare professionals are here to help you 24/7</p>
          <button className="contact-btn" onClick={handleAppointment}>
            Schedule Appointment
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;