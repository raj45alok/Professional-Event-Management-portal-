// DynamicClassic.jsx
import '../../styles/DynamicClassic.css';

const fallbackBanner = 'https://via.placeholder.com/1200x400?text=Event+Banner';
const fallbackAvatar = 'https://via.placeholder.com/150?text=Speaker';
const fallbackLogo = 'https://via.placeholder.com/100x50?text=Logo';
const fallbackVideo = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

export default function DynamicClassic({ event }) {
  if (!event) return <div className="classic-page">Event not found</div>;

  return (
    <div className="classic-page">
      <header className="classic-header">
        <h1>{event.title}</h1>
        <button className="classic-register">Register</button>
      </header>

      <div className="classic-hero">
        <img src={event.image || fallbackBanner} alt="Banner" />
        <div className="hero-overlay">
          <h2>{event.title}</h2>
          <p>{event.date} | {event.contact?.organization}</p>
        </div>
      </div>

      <section className="classic-description">
        <h2>About the Event</h2>
        <p>{event.description}</p>
        <blockquote>"An event inspired by legacy and elegance."</blockquote>
      </section>

      {event.agenda?.length > 0 && (
        <section className="classic-agenda">
          <h2>Agenda</h2>
          <ul>
            {event.agenda.map((item, i) => (
              <li key={i}>
                <span className="time">{item.time}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description} — {item.speaker}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {event.speakers?.length > 0 && (
        <section className="classic-speakers">
          <h2>Speakers</h2>
          <div className="classic-grid">
            {event.speakers.map((sp, i) => (
              <div className="classic-card" key={i}>
                <img src={sp.image || fallbackAvatar} alt={sp.name} />
                <h3>{sp.name}</h3>
                <p>{sp.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {event.videos?.length > 0 && (
        <section className="classic-videos">
          <h2>Event Videos</h2>
          <div className="video-grid">
            {event.videos.map((url, i) => (
              <iframe
                key={i}
                src={url || fallbackVideo}
                title={`Video ${i}`}
                allowFullScreen
              />
            ))}
          </div>
        </section>
      )}

      {event.partners?.length > 0 && (
        <section className="classic-partners">
          <h2>Our Partners</h2>
          <div className="partner-logos">
            {event.partners.map((p, i) => (
              <img key={i} src={p.logo || fallbackLogo} alt={p.name} />
            ))}
          </div>
        </section>
      )}

      <footer className="classic-contact">
        <h2>Contact</h2>
        <p><strong>Name:</strong> {event.contact?.name}</p>
        <p><strong>Email:</strong> <a href={`mailto:${event.contact?.email}`}>{event.contact?.email}</a></p>
        <p><strong>Phone:</strong> {event.contact?.phone}</p>
        <p><strong>Organization:</strong> {event.contact?.organization}</p>
      </footer>
    </div>
  );
}
