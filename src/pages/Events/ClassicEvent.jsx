// src/pages/Events/Templates/ClassicEvent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/ClassicEvent.css';
import banner from '../../assets/classic-banner1.jpg';
import partner1 from '../../assets/partner.jpg';
import partner2 from '../../assets/Speaker2.jpg';

const ClassicEvent = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const youtubeId = "ScMzIvxBSi4"; 

  const agenda = [
    { time: '10:00 AM', title: 'Opening Ceremony' },
    { time: '11:00 AM', title: 'Panel: Ethics in Tech' },
    { time: '12:30 PM', title: 'Lunch Break' },
    { time: '01:30 PM', title: 'Keynote: Future of Software' },
    { time: '03:00 PM', title: 'Closing Remarks' }
  ];

  const partners = [
    { name: 'PartnerOne', logo: partner1 },
    { name: 'PartnerTwo', logo: partner2 }
  ];

  return (
    <div className="classic-container">
      <h1 className="classic-title">Event Description</h1>

      {/* Hero Panel */}
      <div className="hero-section">
        <img src={banner} alt="Classic Event Banner" className="poster-banner" />
        <div className="hero-text">
          <h2>Classic Heritage Forum 2025</h2>
          <p>
            A celebration of timeless ideas and principles in a digital age. Join historians,
            technologists, and visionaries as we explore classical roots of today’s innovations.
          </p>
          <ul>
            <li><strong>Date:</strong> September 20, 2025</li>
            <li><strong>Location:</strong> Delhi</li>
            <li><strong>Organizer:</strong> Legacy Org.</li>
          </ul>
        </div>
      </div>

      {/* About */}
      <div className="section about">
        <h3>About the Event</h3>
        <p>
          This forum brings together thoughts of business leaders from academia and industry to explore how
          classical principles shape modern innovation. From philosophy to programming, every session
          offers deep insights. Inspired by timeless values and the wisdom of operations and management.
        </p>
      </div>

      {/* Agenda */}
      <div className="section">
        <h3>Agenda</h3>
        <table className="agenda-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Session</th>
            </tr>
          </thead>
          <tbody>
            {agenda.map((item, i) => (
              <tr key={i}>
                <td>{item.time}</td>
                <td>{item.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Video Section */}
      <div className="section video">
        <h3>Event Promo Video</h3>
        <div
          style={{
            width: '85%',
            margin: '1rem auto',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          {!showVideo ? (
            <div
              onClick={() => setShowVideo(true)}
              style={{
                position: 'relative',
                backgroundImage: `url(https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingBottom: '56.25%',
                cursor: 'pointer',
                borderRadius: '12px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  borderRadius: '50%',
                  width: '64px',
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: 'white', fontSize: '2rem' }}>▶</span>
              </div>
            </div>
          ) : (
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: '12px',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="Event Promo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '12px'
                }}
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {/* Partners */}
      <div className="section partners">
        <h3>Our Partners</h3>
        <div className="partner-logos">
          {partners.map((partner, i) => (
            <img key={i} src={partner.logo} alt={partner.name} className="partner-logo" />
          ))}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="bottom-buttons">
        <button className="btn-secondary" onClick={() => navigate('/manage-events')}>
          ← Back to Events
        </button>
        <button className="btn-primary" onClick={() => alert('📜 You’re registered for Classic Heritage Forum')}>
          Register
        </button>
      </div>
    </div>
  );
};

export default ClassicEvent;
