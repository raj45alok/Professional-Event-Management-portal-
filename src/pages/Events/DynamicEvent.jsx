// DynamicEvent.jsx

import '../../styles/DynamicEvent.css';
import { useState } from 'react'; // Make sure this is imported at the top

const fallbackAvatar = 'https://via.placeholder.com/150?text=Speaker';
const fallbackLogo = 'https://via.placeholder.com/100x50?text=Logo';

export default function DynamicEvent({ event }) {
const [registered, setRegistered] = useState(false);


  if (!event) {
    return (
      <div className="event-detail error">
        <h2>Event not found or invalid ID.</h2>
      </div>
    );
  }
  {/* Hero Banner */}
{event.image && (
  <div className="event-banner">
    <img src={event.image} alt={event.title} onError={(e) => (e.target.src = fallbackAvatar)} />
  </div>
)}


  return (
    <div className="event-detail">
      <h1 className="page-heading">Event Description</h1>

      {/* Navbar */}
      <nav className="sticky-nav">
        <div className="nav-links">
          <a href="#description">Description</a>
          <a href="#agenda">Agenda</a>
          <a href="#speakers">Speakers</a>
          <a href="#partners">Partners</a>
          <a href="#video">Video</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Description Section */}
      <div className="full-width-section" id="description">
        <h2>Overview</h2>
        <p><strong>Title:</strong> {event.title}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.hero?.location || 'TBD'}</p>
        <p><strong>Organizer:</strong> {event.contact?.organization || 'Unknown'}</p>
      </div>

      {/* Agenda */}
      {event.agenda?.length > 0 && (
        <div className="full-width-section" id="agenda">
          <h2>Agenda</h2>
          <ul>
            {event.agenda.map((item, idx) => (
              <li key={idx}>
                <strong>{item.time}:</strong> {item.title} — {item.speaker}
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Speakers */}
      {event.speakers?.length > 0 && (
        <div className="section" id="speakers">
          <h2>Speakers</h2>
          <div className="card-list">
            {event.speakers.map((sp, idx) => (
              <div className="card" key={idx}>
                <img
                  src={sp.image || fallbackAvatar}
                  alt={sp.name}
                  onError={(e) => (e.target.src = fallbackAvatar)}
                />
                <h3>{sp.name}</h3>
                <p>{sp.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Partners */}
      {event.partners?.length > 0 && (
        <div className="section" id="partners">
          <h2>Our Partners</h2>
          <div className="card-list">
            {event.partners.map((p, idx) => (
              <div className="card" key={idx}>
                <img
                  src={p.logo || fallbackLogo}
                  alt={p.name}
                  onError={(e) => (e.target.src = fallbackLogo)}
                />
                <p>{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

     {event.videos?.length > 0 && (
  <div className="section" id="video">
    <h2>Event Videos</h2>
    <div className="video-wrapper">
      {event.videos.map((url, idx) => (
        <iframe
  key={idx}
  width="480"
  height="270"  // 16:9 aspect ratio
  src={url.replace("watch?v=", "embed/")}
  frameBorder="0"
  allow="autoplay; encrypted-media"
  allowFullScreen
  title={`Event Video ${idx + 1}`}
/>

      ))}
    </div>
  </div>
)}


      {/* Contact */}
      <div className="section contact" id="contact">
        <h2>Contact Organizer</h2>
        <p><strong>Name:</strong> {event.contact?.name}</p>
        <p><strong>Email:</strong> <a href={`mailto:${event.contact?.email}`}>{event.contact?.email}</a></p>
        <p><strong>Phone:</strong> {event.contact?.phone}</p>
      </div>

      {/* Register Button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
       <button
  className="register-btn"
  onClick={() => {
    setRegistered(true);
    alert('✅ Registered successfully!');
  }}
  disabled={registered}
>
  {registered ? '✔ Registered' : 'Register'}
</button>

      </div>
    </div>
  );
}
