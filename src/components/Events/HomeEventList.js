import React, { useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { setEvents } from "./EventsReducer";
import "./style.css";

import * as client from "./client";
import EventItem from "./EventItem";

function HomeEventList({ auth: { isAuthenticated, user }}) {
  const events = useSelector((state) => state.EventsReducer.events);
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

  
  const filteredEvents = (isAuthenticated && user) 
    ? events.filter(event => 
          event.organizer_id === user.id || 
          event.attendance_id.includes(user.id)
      ) : ([...events] 
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate)) // Sort by most recent start date
        .slice(0, 6) 
  );

  return (
    <div>
      {isAuthenticated && user ? (
          <div className="center-container mb-2">Welcome {user.name} !</div>
      ) : (
        <div className="center-container mb-2">Welcome to EVENTHIVE! Latest events for you!</div>
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
                  src={`/pics/${index + 1}.png`}
                  className="card-img-top"
                  alt="..."
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
