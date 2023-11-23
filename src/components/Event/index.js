import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You'll need to install axios with npm or yarn

const EventDetail = ({ match }) => {
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Replace this URL with the actual endpoint from your Node.js backend
        const response = await axios.get(`/api/events/${match.params.eventId}`);
        setEventData(response.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
  }, [match.params.eventId]);

  if (!eventData) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="event-detail-container">
      <img src={eventData.image} alt={eventData.name} />
      <h1>{eventData.name}</h1>
      <p>{eventData.date}</p>
      <p>{eventData.time}</p>
      <p>{eventData.description}</p>
      <p>Price: {eventData.price}</p>
      {/* Add more event details as needed */}
    </div>
  );
};

export default EventDetail;
