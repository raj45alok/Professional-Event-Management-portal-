import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import classicImg from '../../assets/classic-preview.jpg';
import modernImg from '../../assets/modern-preview.jpg';
import calendarIcon from '../../assets/download.jpeg';
import '../../styles/ManageEvents.css';

export default function ManageEvents() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedOrganizer, setSelectedOrganizer] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://ur6pe8weml.execute-api.ap-south-1.amazonaws.com/dev/getEvents");
        const data = await res.json();

        const staticEvents = [
          {
            id: 'static-1',
            title: "Modern Tech Conference 2025",
            description: "Premier tech conference with industry leaders.",
            date: "2025-08-15T09:00:00",
            location: "Mumbai",
            organizer: "TechCorp Inc.",
            image: modernImg,
            template: 'modern',
            speakers: 2,
            sessions: 1,
          },
          {
            id: 'static-2',
            title: "Classic Business Summit 2025",
            description: "Summit on business growth strategies.",
            date: "2025-09-20T10:00:00",
            location: "New Delhi",
            organizer: "Business Network",
            image: classicImg,
            template: 'classic',
            speakers: 1,
            sessions: 1,
          }
        ];

        setEvents([...data, ...staticEvents]);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  function filterByDate(eventDateStr, filter) {
    const now = new Date();
    const eventDate = new Date(eventDateStr);

    if (filter === 'today') return eventDate.toDateString() === now.toDateString();
    if (filter === 'this-week') {
      const weekFromNow = new Date();
      weekFromNow.setDate(now.getDate() + 7);
      return eventDate >= now && eventDate <= weekFromNow;
    }
    if (filter === 'this-month') {
      return (
        eventDate.getMonth() === now.getMonth() &&
        eventDate.getFullYear() === now.getFullYear()
      );
    }
    if (filter === 'upcoming') return eventDate > now;

    return true;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const uniqueOrganizers = [...new Set(events.map(e => e.organizer).filter(Boolean))];

  return (
    <div className="dashboard-wrapper">
      <nav className="top-nav">
        <div className="brand">
          <img src={calendarIcon} alt="icon" className="icon" />
          <span>Professional Event Management</span>
        </div>
        <div className="nav-actions">
          <button className="nav-btn active">👥 Events</button>
       <button
  style={{
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: '600',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
  }}
  onClick={() => navigate('/templates')}
>
  ➕ Create Event
</button>


        </div>
      </nav>

      <header className="hero-box">
        <h1>Manage Your Events</h1>
        <p>Create stunning event experiences with our modern, professional tools</p>
        <div className="hero-actions">
          <button className="cta-btn" onClick={() => navigate('/templates')}>
            + Create Your First Event
          </button>
          <div className="avatar-group">
            <div className="avatar" />
            <div className="avatar" />
            <div className="avatar" />
            <span>Join thousands of event organizers</span>
          </div>
        </div>
      </header>

      <section className="events-section">
        <div className="section-header">
          <h2>Events</h2>
          <p>Discover and manage upcoming events</p>
          <span className="event-count">{events.length} events</span>
        </div>

        <div className="filter-box">
          <h3>Filters</h3>
          <div className="filters">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              value={selectedOrganizer}
              onChange={(e) => setSelectedOrganizer(e.target.value)}
            >
              <option value="">All Organizers</option>
              {uniqueOrganizers.map(org => (
                <option key={org} value={org}>{org}</option>
              ))}
            </select>

            <select
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
            >
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="upcoming">Upcoming</option>
            </select>

            <div className="calendar-wrapper">
              <img
                src={calendarIcon}
                alt="Calendar"
                className="calendar-icon"
                onClick={() => setShowCalendar(!showCalendar)}
              />
              {showCalendar && (
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  inline
                />
              )}
            </div>
          </div>
        </div>
               <div className="event-cards-container">
          {events
            .filter(event => {
              const isFuture = new Date(event.date) >= new Date();
              const matchesTitle = event.title.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesOrganizer =
                !selectedOrganizer || event.organizer?.toLowerCase() === selectedOrganizer.toLowerCase();
              const matchesDate =
                !selectedDateFilter || filterByDate(event.date, selectedDateFilter);

              return isFuture && matchesTitle && matchesOrganizer && matchesDate;
            })
            .map(event => (
              <div key={event.id || event.eventId} className="event-card-new">
                <div className="event-card-image-container">
                 <img
  src={event.image || modernImg}
  alt={event.title}
  className="event-card-image"
  onError={(e) => { e.target.src = modernImg }}
/>

                  <span className={`tag ${event.template}`}>{event.template}</span>
                </div>

                <div className="event-card-content">
                  <div className="event-card-header">
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                  </div>

                  <ul className="event-details">
                    <li>{formatDate(event.date)}</li>
                    <li>{event.location}</li>
                    <li>{event.organizer}</li>
                  </ul>

                  <div className="event-meta">
                    <span>[{event.speakers?.length || event.speakers || 0} speakers]</span>
                    <span>[{event.agenda?.length || event.sessions || 0} sessions]</span>
                  </div>

                  <div className="view-button-container">
                    <button
                      className="view-button"
                      onClick={() => {
                        if (event.id === 'static-1') {
                          navigate('/events/ModernEvent');
                        } else if (event.id === 'static-2') {
                          navigate('/events/ClassicEvent');
                        } else {
                          navigate(`/event/${event.eventId}`);
                        }
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
