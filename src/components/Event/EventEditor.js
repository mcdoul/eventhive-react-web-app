import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addEvent as addEventAction, updateEvent as updateEventAction, deleteEvent as deleteEventAction, setEvents } from "../Events/EventsReducer";
import * as client from "../Events/client"


function EventEditor() {
  const { pathname } = useLocation();
  const parts = pathname.split('/');
  const screen = parts[parts.length - 1];

  const selectedEvent = useSelector((state) => state.EventsReducer.event);
  const [event, setEvent] = useState({ 
    name: "",
    location: "", 
    startDate: "", 
    endDate: "",   
    organizer_id: "",
    attendance_id: [],
    price: "",
    description: "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const deleteEventHandler = async () => {
    try {
        await client.deleteEvent(event._id);
        dispatch(deleteEventAction(event._id));
    } catch (error) {
        console.error("Failed to delete Event:", error);
    }
  };

  const addEventHandler = async () => {
    try {
      const newEvent = await client.createEvent(event);
      dispatch(addEventAction(newEvent));
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  const updateEventHandler = async () => {
    try {
      const updatedEvent = await client.updateEvent(event._id, event);
      dispatch(updateEventAction(updatedEvent));
      fetchEvents(); 
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      setEvent(selectedEvent);
    }
  }, [selectedEvent]);

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
    <ul className="list-group mb-3" style={{ width: 350 }}>
      <li className="list-group-item form-control">
        <p>
          Event Name: <input
            name="name"
            className="float-end form-control"
            value={event.name}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Event Location: <input
            name="location"
            className="float-end form-control"
            value={event.location}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Event Start Date: <input
            name="startDate"
            className="float-end form-control"
            value={event.startDate}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Event End Date: <input
            name="endDate"
            className="float-end form-control"
            value={event.endDate}
            onChange={handleInputChange}
          />
        </p>
        <p> Add more...</p>
        
        {screen === "new" ? (
          <>
          <Link to={`/EventHive/eventslist`}>
            <button className="float-end btn btn-outline-black"> Cancel </button>
          </Link>
          <button className="float-end btn btn-outline-black me-2" onClick={addEventHandler}> Add </button>
          </>
        ) : (
          <>
          <button className="float-end btn btn-outline-black" onClick={() => deleteEventHandler(event._id)}>Delete</button>
          <button className="float-end btn btn-outline-black me-2" onClick={updateEventHandler}> Update </button>
          </>
        )}

      </li>
    </ul>
  );
}

export default EventEditor;