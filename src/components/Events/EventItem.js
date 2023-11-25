import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import * as client from "./client";

import {
  deleteEvent,
  setEvents,
} from "./EventsReducer";
import { deleteEvent as deleteEventClient} from "./client";

function EventItem({ event }) {
  const dispatch = useDispatch();
  
  const fetchEvents = async () => {
    try {
      const events = await client.findAllEvents();
      dispatch(setEvents(events));
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDeleteEvent = (eventId) => {
    deleteEventClient(eventId).then((status) => {
      dispatch(deleteEvent(eventId));
    });
  };

  return (
    <div>
      <h5 className="card-title">
        {event.location} {event.name}
      </h5>
      <p className="card-text">
        {/* will fetch user data and change id to name  */}
        Organizer: {event.organizer_id} 
      </p>
      <p className="card-text">
        Attendance: {event.attendance_id.length}
      </p>
      <p className="card-text">
        Start from {event.startDate} to {event.endDate}
      </p>
      <div className="d-flex justify-content-between">
        <Link to={`/EventHive/Events/${event._id}`}>
          <button className="btn btn-outline-white">View {event.name}</button>
        </Link>

        <div>
          <Link to={`/events/edit/${event._id}`}>
            <button className="btn btn-outline-white me-2">Edit</button>
          </Link>
          <button className="btn btn-outline-white" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
export default EventItem;
