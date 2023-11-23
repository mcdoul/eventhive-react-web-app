import React, { useEffect, useState }  from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import {
  addEvent,
  deleteEvent,
  updateEvent,
  setEvent,
  setEvents,
} from "./EventsReducer";
import { findAllEvents, createEvent, deleteEvent as deleteEventClient, updateEvent as updateEventClient } from "./client";
import "./style.css";


function EventList() {
  const events = useSelector((state) => state.EventsReducer.events);
  const event = useSelector((state) => state.EventsReducer.event);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewEvent = (eventId) => {
    navigate(`/EventHive/events/${eventId}`);
  };

  useEffect(() => {
    findAllEvents()
      .then((events) => dispatch(setEvents(events)));
  }, [dispatch]);

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-4 d-flex flex-row flex-wrap">
        {events.map((eventItem, index) => (
          <div key={eventItem._id} className="col">
            <div className="card image-container">
              <img
                src={`/pics/${index + 1}.png`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">

              <h5 className="card-title">
                <Link to={`/EventHive/events/${eventItem._id}`} className="wd-fg-color-white">
                  {eventItem.number} {eventItem.name}
                </Link>
              </h5>
              <p className="card-text">
                {/* event ID: {eventItem._id}  */}
                Start from {eventItem.startDate} to {eventItem.endDate}
              </p>
              <div>
                <button className="btn btn-outline-white" onClick={() => handleViewEvent(eventItem._id)}> View {eventItem.name} </button>
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default EventList;
