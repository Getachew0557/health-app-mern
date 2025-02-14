import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './About.css';

const About = () => {
  const [stats, setStats] = useState([
    { number: 0, target: 15, suffix: "+", text: "Years Experience" },
    { number: 0, target: 100, suffix: "+", text: "Medical Specialists" },
    { number: 0, target: 50000, suffix: "+", text: "Happy Patients" },
    { number: 24, suffix: "/7", text: "Emergency Service" }
  ]);

  const achievements = [
    {
      icon: "fas fa-certificate",
      title: "Certified Excellence",
      description: "Accredited by leading healthcare organizations"
    },
    {
      icon: "fas fa-star",
      title: "Best Care Quality",
      description: "Consistently rated 5-stars by patients"
    },
    {
      icon: "fas fa-award",
      title: "Innovation Leaders",
      description: "Pioneering modern medical technologies"
    }
  ];

  const { ref: statsRef, inView: statsVisible } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (statsVisible) {
      const duration = 2000; // Animation duration in milliseconds
      const steps = 60; // Number of steps in the animation
      const interval = duration / steps;

      const counters = stats.map((stat, index) => {
        return setInterval(() => {
          setStats(currentStats => {
            const newStats = [...currentStats];
            const step = stat.target / steps;
            
            if (newStats[index].number < stat.target) {
              newStats[index] = {
                ...newStats[index],
                number: Math.min(
                  Math.ceil(newStats[index].number + step),
                  stat.target
                )
              };
            }
            return newStats;
          });
        }, interval);
      });

      return () => counters.forEach(counter => clearInterval(counter));
    }
  }, [statsVisible]);

  const [isHovered, setIsHovered] = useState(null);

  const formatNumber = (number) => {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + 'K';
    }
    return number;
  };

  return (
    <div className="about-section" id="about">
      <div className="about-container">
        <div className="about-header" 
             data-aos="fade-up" 
             data-aos-duration="1000">
          <h2>About DocCare</h2>
          <div className="header-underline"></div>
        </div>

        <div className="about-content">
          <div className="about-image" 
               data-aos="fade-right" 
               data-aos-duration="1000">
            <img src="/api/placeholder/500/400" alt="Medical Team" className="main-image" />
            <div className="experience-badge">
              <span className="years">15+</span>
              <span className="text">Years of Excellence</span>
            </div>
          </div>

          <div className="about-text" 
               data-aos="fade-left" 
               data-aos-duration="1000">
            <h3>Leading Healthcare Provider Since 2008</h3>
            <p>
              At DocCare, we combine medical excellence with advanced technology 
              to deliver exceptional patient care. Our commitment to innovation 
              and compassion has made us a trusted healthcare partner for 
              thousands of families.
            </p>
            
            <div className="key-points">
              {['Expert Medical Professionals', 'Advanced Medical Technology', 'Patient-Centered Approach'].map((point, index) => (
                <div 
                  key={index} 
                  className="point"
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <i className={`fas fa-check-circle ${isHovered === index ? 'animate-bounce' : ''}`}></i>
                  <span className={isHovered === index ? 'text-highlight' : ''}>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="stats-container" ref={statsRef}>
          {stats.map((stat, index) => (
            <div key={index} className="stat-item" data-aos="zoom-in" data-aos-delay={index * 100}>
              <h3>{formatNumber(stat.number)}{stat.suffix}</h3>
              <p>{stat.text}</p>
            </div>
          ))}
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className="achievement-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              onMouseEnter={() => setIsHovered(`achievement-${index}`)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <i className={`${achievement.icon} ${isHovered === `achievement-${index}` ? 'rotate-icon' : ''}`}></i>
              <h4>{achievement.title}</h4>
              <p>{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;