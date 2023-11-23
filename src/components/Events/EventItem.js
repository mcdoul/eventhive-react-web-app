import React from "react";
import { useDispatch } from "react-redux";
import { deleteEvent, setEvent } from "./EventsReducer";
import { Link } from "react-router-dom";

function EventItem({ event }) {
  const dispatch = useDispatch();
  
  return (
    <div>
      <h5 className="card-title">
        <Link to={`/EventHive/events/${event._id}`} className="wd-fg-color-white">
          {event.number} {event.name}
        </Link>
      </h5>
      <p className="card-text">
        {/* event ID: {event._id}  */}
        Start from {event.startDate} to {event.endDate}
      </p>
      <div>
      <button className="btn btn-outline-white" onClick={() => dispatch(deleteEvent(event._id))}> View {event.name} </button>
      </div>
    </div>
  );
}
export default EventItem;