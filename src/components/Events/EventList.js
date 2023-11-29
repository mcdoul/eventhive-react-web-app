import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setEvents } from "./EventsReducer";
import "./style.css";

import * as client from "./client";
import EventItem from "./EventItem";

function EventList() {
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

                <EventItem event={eventItem} />

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default EventList;