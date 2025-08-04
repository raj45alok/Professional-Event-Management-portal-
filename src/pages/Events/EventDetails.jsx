// EventDetails.jsx
import React, { useRef, useState } from 'react';
import '../../styles/EventDetails.css';

export default function EventDetails() {
  const aboutRef = useRef(null);
  const speakersRef = useRef(null);
  const agendaRef = useRef(null);
  const partnersRef = useRef(null);
  const videosRef = useRef(null);
  const contactRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
see
  return (
    <div className="event-page">
      {/* HEADER */}
      <header className="banner">
        <h1>Tech Conference 2024</h1>
        <p>The premier technology conference bringing together industry leaders and innovators.</p>
        <div className="info">
          <span>📅 August 15, 2025 | 09:00 AM</span>
          <span>📍 Convention Center, San Francisco</span>
          <span>🏢 TechCorp Inc.</span>
        </div>

        <nav className="navbar">
          <button onClick={() => scrollTo(aboutRef)}>About</button>
          <button onClick={() => scrollTo(speakersRef)}>Speakers</button>
          <button onClick={() => scrollTo(agendaRef)}>Agenda</button>
          <button onClick={() => scrollTo(partnersRef)}>Partners</button>
          <button onClick={() => scrollTo(videosRef)}>Videos</button>
          <button onClick={() => scrollTo(contactRef)}>Contact</button>
          <button className="register-btn" onClick={() => setShowModal(true)}>Register</button>
        </nav>
      </header>

      {/* CONTENT SECTIONS */}
      <section ref={aboutRef} className="section">
        <h2>About</h2>
        <p>This event will showcase breakthroughs in AI, cloud computing, blockchain, and more.</p>
      </section>

      <section ref={speakersRef} className="section">
        <h2>Speakers</h2>
        <ul>
          <li>Dr. Alice Johnson – CTO at FutureTech</li>
          <li>Mark Lee – CEO of InnovateNow</li>
        </ul>
      </section>

      <section ref={agendaRef} className="section">
        <h2>Agenda</h2>
        <p>09:00 - Keynote | 11:00 - Panel Discussions | 14:00 - Networking</p>
      </section>

      <section ref={partnersRef} className="section">
        <h2>Partners</h2>
        <p>Partnered with TechCorp, DevWorld, AI Today.</p>
      </section>

      <section ref={videosRef} className="section">
        <h2>Videos</h2>
        <p>Highlights from last year's event will be uploaded soon.</p>
      </section>

      <section ref={contactRef} className="section">
        <h2>Contact</h2>
        <p>Email: info@techconf2024.com | Phone: +1 234 567 890</p>
      </section>

      {/* REGISTER MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Register for Tech Conference 2024</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert("Registered successfully!");
              setShowModal(false);
            }}>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email" required />
              <input type="text" placeholder="Company" />
              <button type="submit">Submit</button>
            </form>
            <button className="close-btn" onClick={() => setShowModal(false)}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
}
