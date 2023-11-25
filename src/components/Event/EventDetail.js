import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setEvent } from "../Events/EventsReducer";
import * as client from "../Events/client";

const EventDetail = () => {
  const { eventId } = useParams();
  const eventData = useSelector(state => state.EventsReducer.event);
  const dispatch = useDispatch();

  const fetchEvent = async () => {
    try {
      const eventData = await client.findEvent(eventId);
      dispatch(setEvent(eventData));
    } catch (error) {
      console.error("Failed to fetch event:", error);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (!eventData) {
    return <div>Loading event details...</div>;
  }

  return (
    <div className="event-detail-container wd-fg-color-white" style={{ maxWidth: '800px', margin: 'auto', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <img src={eventData.image || 'default-image-url.jpg'} alt={eventData.name} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
      <h1 style={{ color: '#333', marginTop: '20px' }}>{eventData.name}</h1>
      <p><strong>Date:</strong> {eventData.startDate} to {eventData.endDate}</p>
      <p><strong>Location:</strong> {eventData.location}</p>
      <p><strong>Description:</strong> {eventData.description}</p>
      <p><strong>Price:</strong> $ {eventData.price}</p>
      <p><strong>Organizer:</strong> {eventData.organizer_id}</p>
      <p><strong>Attendance:</strong> {eventData.attendance_id.length}</p>
      <a href={eventData.registrationLink} style={{ display: 'inline-block', padding: '10px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>Register / More Info</a>
    </div>
  );
};

export default EventDetail;
