import React, { useEffect } from "react";
import { useDispatch, connect  } from "react-redux";
import { Link } from "react-router-dom";
import { setEvents } from "./EventsReducer";
import * as client from "./client";
import PropTypes from 'prop-types';


function EventItem({ event, auth: { isAuthenticated } }) {
  const dispatch = useDispatch();
  
  const fetchEvents = async () => {
    try {
      const events = await client.findAllEvents();
      dispatch(setEvents(events));
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const formatDate = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      if (!isNaN(date)) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
    }
    return 'N/A'; 
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
        Start from {event.startDate && formatDate(event.startDate)} to {event.endDate && formatDate(event.endDate)}
      </p>
      <div className="button-container">
        <Link to={`/EventHive/Events/${event._id}`}>
        <button className="btn btn-outline-white me-2 mb-2"> View {event.name} </button>
        </Link>
      </div>
    </div>
  );
}

EventItem.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(EventItem);