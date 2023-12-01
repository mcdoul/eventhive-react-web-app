import React, { useEffect, useCallback } from "react";
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
  const defaultImgUrl = "http://res.cloudinary.com/dif777yh9/image/upload/v1701296949/cld-sample-4";

  const fetchEvents = useCallback(async () => {
    try {
      const events = await client.findAllEvents();
      dispatch(setEvents(events));
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  
  const OrginizedEvents = (isAuthenticated && user) 
    ? events.filter(event => 
        event.organizer_id === user.email
      ) : ([...events] 
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .slice(0, 6) 
  );

  const RegisteredEvents = (isAuthenticated && user) 
    ? events.filter(event => 
        event.attendance_id.includes(user.email)
      ) : ([...events] 
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate)) // Sort by most recent start date
        .slice(0, 6) 
  );

  const LatestEvents = ([...events] 
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .slice(0, 6)
  );

  return (
    <div>
      {isAuthenticated && user ? (
        <>
          <div className="center-container mb-4">Welcome to EVENTHIVE, {user.name}!</div>

          {OrginizedEvents.length === 0 && RegisteredEvents.length === 0 ? (
            <div className="center-container">
              You haven't been involved in any events yet
              <br />
              Join or Create one Event on EVENTHIVE!
              <br />
              <img src="/pics/party.jpeg" alt="Party" />
            </div>
          ) : (
            <div className='row'>
              <div className='col'>
                <div className="row row-cols-1 d-flex flex-row flex-wrap">
                  {OrginizedEvents.length === 0 ? (
                    <div className="col">
                      <h4 className="space-letter">You haven't created any events yet.</h4>
                    </div>
                  ) : (
                    <>
                      <h4 className="space-letter ms-2">Your Events</h4>
                      {OrginizedEvents.map((eventItem) => (
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
                    </>
                  )}
                </div>
              </div>
              <div className='col'>
                <div className="row row-cols-1 d-flex flex-row flex-wrap">
                  {RegisteredEvents.length === 0 ? (
                    <div className="col">
                      <h4 className="space-letter">You haven't registered for any events yet.</h4>
                    </div>
                  ) : (
                    <>
                      <h4 className="space-letter ms-2">Registered Events</h4>
                      {RegisteredEvents.map((eventItem) => (
                        <div key={eventItem._id} className="col">
                          <div className="card image-container mb-4">
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
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="center-container mb-4">Welcome to EVENTHIVE! Latest events for you!</div>
          <div className="row row-cols-1 row-cols-md-3 g-4 d-flex flex-row flex-wrap">
            {LatestEvents.map((eventItem) => (
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
        </>
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
