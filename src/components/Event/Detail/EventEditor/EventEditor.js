import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEvent as addEventAction, updateEvent as updateEventAction, deleteCourse as deleteCourseAction, setEvents } from "./EventsReducer";
import * as client from "./client";

function EventEditor() {
  const selectedEvent = useSelector((state) => state.eventReducer.event);
  const [event, setEvent] = useState({ 
    name: "",
    number: "", 
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

  const deleteCourseHandler = async () => {
    try {
        await client.deleteCourse(course._id);
        dispatch(deleteCourseAction(course._id));
    } catch (error) {
        console.error("Failed to delete course:", error);
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
          Event Number: <input
            name="number"
            className="float-end form-control"
            value={event.number}
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
        <button className="float-end btn btn-primary mt-2" onClick={updateEventHandler}> Update </button>
        <button className="float-end btn btn-success mt-2 me-2" onClick={addEventHandler}> Add </button>
      </li>
    </ul>
  );
}

export default EventEditor;
