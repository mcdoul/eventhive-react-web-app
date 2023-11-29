import React, { useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { setEvents } from "./EventsReducer";
import { useLocation } from "react-router-dom";
import "./style.css";

import * as client from "./client";
import EventItem from "./EventItem";

function HomeEventList({ auth: { isAuthenticated, user }}) {
  const events = useSelector((state) => state.EventsReducer.events);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const parts = pathname.split('/');
  const screen = parts[parts.length - 1];
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

  
  const filteredEvents = (isAuthenticated && user) 
    ? events.filter(event => 
          event.organizer_id === user.email || 
          event.attendance_id.includes(user.email)
      ) : ([...events] 
        .sort((a, b) => b.attendance_id.length - a.attendance_id.length) 
        .slice(0, 3) 
  );

  return (
    <div>
      {isAuthenticated && user ? (
          <div className="center-container mb-2">Welcome {user.name} !</div>
      ) : (
        <div className="center-container mb-2">Popular Events</div>
      )}

      {filteredEvents.length === 0 ? (
        <div className="center-container">
          You haven't been involved in any envents yet
          <br/>
          Join or Create one Event on EVENTHIVE!
          <br/>
          <img src = "/pics/party.jpeg"></img>
        </div>
      ) : (
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
      )}
    </div>
  );
}

HomeEventList.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(HomeEventList);
