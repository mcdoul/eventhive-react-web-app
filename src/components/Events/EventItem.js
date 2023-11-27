import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setEvents } from "./EventsReducer";
import * as client from "./client";


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

  return (
    <div>
      <h5 className="card-title">
        {event.location} {event.name}
      </h5>
      <p className="card-text">
        {/* will fetch user data and change id to name  */}
        Organizer: {event.organizer_id} | Price: $ {event.price}
      </p>
      <p className="card-text">
        Attendance: {event.attendance_id.length}
      </p>
      <p className="card-text">
        Start from {event.startDate} to {event.endDate}
      </p>
      <div>
        <Link to={`/EventHive/Events/${event._id}`}>
        <button className="btn btn-outline-white me-2 mb-2"> View {event.name} </button>
        </Link>

        <Link to={`/EventHive/events/edit/${event._id}`}>
          <button className="btn btn-outline-white me-2">Edit</button>
        </Link>
      
      </div>
    </div>
  );
}
export default EventItem;
