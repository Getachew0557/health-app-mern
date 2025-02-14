import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'general',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false
    });
  }, []);

  const contactInfo = [
    {
      icon: 'fas fa-phone',
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      color: '#2a5298'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Us',
      details: ['info@doccare.com', 'support@doccare.com'],
      color: '#28a745'
    },
    {
      icon: 'fas fa-location-dot',
      title: 'Visit Us',
      details: ['123 Healthcare Ave', 'Medical Center, AA 1000'],
      color: '#dc3545'
    }
  ];

  const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'appointments', label: 'Appointments' },
    { value: 'emergency', label: 'Emergency Care' },
    { value: 'billing', label: 'Billing & Insurance' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: 'general',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <div className="contact-section" id="contact">
      <div className="contact-container mb-5">
        <div className="contact-header" data-aos="fade-up">
          <h2>Contact Us</h2>
          <div className="header-underline"></div>
          <p className="contact-subtitle">
            Get in touch with us for any questions or concerns
          </p>
        </div>

        <div className="contact-info-grid" data-aos="fade-up">
          {contactInfo.map((info, index) => (
            <div 
              key={index} 
              className="contact-info-card"
              style={{ '--hover-color': info.color }}
            >
              <div className="info-icon">
                <i className={info.icon}></i>
              </div>
              <h3>{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx}>{detail}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="contact-content" id='contact'>
          <div className="map-container" data-aos="fade-right">
            <iframe
              title="location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1896144.983217735!2d33.71150929260703!3d9.145104523032208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b68dcb0494eb9%3A0x246bda194aa3ff4f!2sEthiopia!5e0!3m2!1sen!2sus!4v1644429837094!5m2!1sen!2sus"              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} data-aos="fade-left">
            <h3>Send us a Message</h3>
            
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                {departments.map(dept => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows="5"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Sending...
                </>
              ) : 'Send Message'}
            </button>

            {submitStatus && (
              <div className={`submit-status ${submitStatus}`}>
                {submitStatus === 'success' ? (
                  'Message sent successfully!'
                ) : (
                  'Error sending message. Please try again.'
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;