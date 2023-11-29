import React, { useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import { setEvents } from "./EventsReducer";
import "./style.css";

import * as client from "./client";
import EventItem from "./EventItem";


function EventList({ searchQuery, auth: { isAuthenticated } }) {
  const events = useSelector((state) => state.EventsReducer.events);
  const dispatch = useDispatch();
  const defaultImgUrl = "http://res.cloudinary.com/dif777yh9/image/upload/v1701296949/cld-sample-4";


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

  const filteredEvents = searchQuery
    ? events.filter(event => 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : events;

  return (
    <div>
      {isAuthenticated && (
        <Link to="/EventHive/events/new" className="btn btn-outline-white btn-create-event center-container mb-2"> + Create Event</Link>
      )}
      <div className="row row-cols-1 row-cols-md-3 g-4 d-flex flex-row flex-wrap">
        {filteredEvents.map((eventItem, index) => (
          <div key={eventItem._id} className="col">
            <div className="card image-container">
              <img
                src={eventItem.imageUrl || defaultImgUrl} 
                className="card-img-top"
                alt={eventItem.name}
              />
              <div className="card-body">
                <EventItem event={eventItem} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

EventList.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(EventList);