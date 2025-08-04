// src/pages/EventRouter.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DynamicClassic from './DynamicClassic';
import DynamicEvent from './DynamicEvent';

export default function EventRouter() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://ur6pe8weml.execute-api.ap-south-1.amazonaws.com/dev/getEventDetails?eventId=${eventId}`);
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  if (loading) return <div className="event-detail"><h2>Loading event...</h2></div>;
  if (!event) return <div className="event-detail error"><h2>Event not found or invalid ID.</h2></div>;

  return event.template === 'classic' ? (
    <DynamicClassic event={event} />
  ) : (
    <DynamicEvent event={event} />
  );
}
