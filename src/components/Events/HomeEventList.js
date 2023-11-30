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

  
  const OrginizedEvents = (isAuthenticated && user) 
    ? events.filter(event => 
          event.organizer_id === user.id
      ) : ([...events] 
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .slice(0, 6) 
  );

  const RegisteredEvents = (isAuthenticated && user) 
    ? events.filter(event => 
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

      {OrginizedEvents.length === 0 && RegisteredEvents.length === 0 ? (
        <div className="center-container">
          You haven't been involved in any envents yet
          <br/>
          Join or Create one Event on EVENTHIVE!
          <br/>
          <img src = "/pics/party.jpeg"></img>
        </div>
      ) : (
        <div className='row'>
          <div className='col'>
            
            <div className="row row-cols-1 d-flex flex-row flex-wrap">
              {OrginizedEvents.length === 0 ? (
                <div className="col">
                  <h4 className="wd-fg-color-white">You haven't created any events yet.</h4>
                </div>
              ) : (
                <>
                  <h4 className="wd-fg-color-white ms-2">Your Events</h4>
                  {OrginizedEvents.map((eventItem, index) => (
                    <div key={eventItem._id} className="col">
                      <div className="card image-container">
                        <img
                          src={`/pics/${index + 1}.png`}
                          className="card-img-top"
                          alt="Event Image"
                        />
                        <div className="card-body">
                          <EventItem event={eventItem} />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className='col'>
            <div className="row row-cols-1 d-flex flex-row flex-wrap">
              {RegisteredEvents.length === 0 ? (
                <div className="col">
                  <h4 className="wd-fg-color-white">You haven't registed any events yet.</h4>
                </div>
              ) : (
                <>
                  <h4 className="wd-fg-color-white ms-2">Registed Events</h4>
                  {RegisteredEvents.map((eventItem, index) => (
                    <div key={eventItem._id} className="col"> 
                      <div className="card image-container">
                        <img
                          src={`/pics/${index + 1}.png`}
                          className="card-img-top"
                          alt="Event Image"
                        />
                        <div className="card-body">
                          <EventItem event={eventItem} />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
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
