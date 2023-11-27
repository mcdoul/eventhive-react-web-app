import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addEvent as addEventAction, updateEvent as updateEventAction, deleteEvent as deleteEventAction, setEvents } from "../Events/EventsReducer";
import { useParams } from "react-router-dom";
import * as client from "../Events/client"
import "./style.css";


function EventEditor() {
  const { pathname } = useLocation();
  const parts = pathname.split('/');
  const screen = parts[parts.length - 1];

  const selectedEvent = useSelector((state) => state.EventsReducer.event);
  const { eventId } = useParams();
  const events = useSelector(state => state.EventsReducer.events);
  const dispatch = useDispatch();


  const [event, setEvent] = useState({ 
    name: "",
    location: "", 
    startDate: "", 
    endDate: "",   
    organizer_id: "",
    attendance_id: [],
    price: "",
    description: "",
    comments: [],
    registered: [],
  });
  
  const handleInputChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (event._id) {
      await updateEventHandler();
    } else {
      await addEventHandler();
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
      const updatedEvent = await client.updateEvent(eventId, event);
      dispatch(updateEventAction(updatedEvent));
      fetchEvents(); 
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  };

  const handleDeleteEvent = (eventId) => {
    client.deleteEvent(eventId).then((status) => {
      dispatch(deleteEventAction(eventId));
    });
  };

  useEffect(() => {
    if (eventId) {
      const selectedEvent = events.find(e => e._id === eventId);
      if (selectedEvent) {
        setEvent(selectedEvent);
      } else {
        client.findEvent(eventId)
        .then(data => setEvent(data))
        .catch(error => console.error("Failed to fetch event:", error));
      }
    }
  }, [eventId, events]);


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
      <h4 className="wd-fg-color-white">Create or Edit Event! </h4>
      <div className="event-detail-container">
          <form className="left-section" onSubmit={handleSubmit} >
            <div className="form-group info-item">
              <label>Event Name</label>
              <input 
                type="text" 
                name="name" 
                value={event.name} 
                onChange={handleInputChange} 
                className="form-control" 
              />
            </div>
            <div className="form-group info-item">
              <label>Start Date</label>
              <input 
                type="date" 
                name="startDate" 
                value={event.startDate} 
                onChange={handleInputChange} 
                className="form-control" 
              />
            </div>
            <div className="form-group info-item">
              <label>End Date</label>
              <input 
                type="date" 
                name="endDate" 
                value={event.endDate} 
                onChange={handleInputChange} 
                className="form-control" 
              />
            </div>
            <div className="form-group info-item">
              <label>Description</label>
              <textarea 
                name="description" 
                value={event.description} 
                onChange={handleInputChange} 
                className="form-control" 
              ></textarea>
            </div>
            <div className="form-group info-item">
              <label>Price:</label>
              <input 
                type="number" 
                name="price" 
                value={event.price} 
                onChange={handleInputChange} 
                className="form-control"
                min="0.00" 
                step="0.01" 
                placeholder="0.00"
              />
            </div>
            <Link to={`/EventHive`}>
              <button className="float-end btn btn-outline-black"> Cancel </button>
            </Link>
            <button className="float-end btn btn-outline-black me-2" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
            <button type="submit" className="btn btn-pink" onChange={handleSubmit}>Submit Event</button>
        </form>
      </div>
    </div>
  );
}

export default EventEditor;