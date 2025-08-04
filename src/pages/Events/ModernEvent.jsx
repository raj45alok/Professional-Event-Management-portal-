
import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/ModernEvent.css';
import banner from '../../assets/modern-banner.jpg';

const ModernEvent = () => {
  const navigate = useNavigate();

  const agenda = [
    { time: '09:00 AM', title: 'Registration & Welcome' },
    { time: '10:00 AM', title: 'Keynote: Future of AI in Cloud(Serverless Compute ) ' },
    { time: '11:30 AM', title: 'Panel: Cloud Computing in 2025' },
    { time: '01:00 PM', title: 'Lunch & Networking' },
    { time: '02:00 PM', title: 'Workshop: Building with AWS Lambda ' }
  ];

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
   <div className="event-detail modern-gradient">

      <h1 className="page-title">Event Description</h1>

      {/* Hero Card */}
      <div className="hero-card">
        <img src={banner} alt="Event Banner" className="hero-img" />
        <div className="hero-content">
          <h2>Modern Tech Conference 2025</h2>
          <p>Premier tech conference with industry leaders. Explore modern trends, innovations, and insights.</p>
          <ul>
            <li><strong>Date:</strong> August 15, 2025</li>
            <li><strong>Location:</strong> Mumbai</li>
            <li><strong>Organizer:</strong> TechCorp Inc.</li>
          </ul>
        </div>
      </div>

      {/* Naive Scroll Tabs */}
      <div className="section-tabs">
        {['about', 'agenda', 'speakers', 'partners', 'videos', 'contact'].map(tab => (
          <button key={tab} onClick={() => scrollTo(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="section-block" id="about">
        <h2>About the Event</h2>
        <p>
          Join the most anticipated technology conference of the year. Learn from top industry experts,
          network with professionals, and experience the future of innovation.
        </p>
      </div>

      <div className="section-block" id="agenda">
        <h2>Agenda</h2>
        <ul className="agenda-list">
          {agenda.map((item, i) => (
            <li key={i}>
              <span>{item.time}</span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="section-block" id="speakers">
        <h2>Speakers</h2>
        <p>Session 1: Dr C.P Koushik</p>
        <p>Session 2 : Dr Anju Shukla </p>
      </div>

      <div className="section-block" id="partners">
        <h2>Partners</h2>
        <p>Partners to be announced.</p>
      </div>

      <div className="section-block" id="videos">
  <h2>Videos</h2>
  <div className="video-wrapper">
    <iframe
      width="100%"
      height="415"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="Event Preview"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</div>


      <div className="section-block" id="contact">
        <h2>Contact</h2>
        <p>Email: contact@techcorp.com</p>
        <p>Phone: +91-98765-43210</p>
        <p>Website: https://moderntechconf.com</p>
      </div>

      {/* Bottom Buttons */}
      <div className="bottom-buttons">
        <button className="btn-secondary" onClick={() => navigate('/manage-events')}>
          ← Back to Events
        </button>
        <button className="btn-primary" onClick={() => alert('✅ You are registered for this event!')}>
          Register
        </button>
      </div>
    </div>
  );
};

export default ModernEvent;
