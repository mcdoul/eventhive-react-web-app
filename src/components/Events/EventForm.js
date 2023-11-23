import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEvent, updateEvent, setEvent } from "./EventsReducer";

function EventForm() {
  const { event } = useSelector((state) => state.eventReducer);
  const dispatch = useDispatch();
  return (
    <ul className="list-group mb-3" style={{width:350}}>
      <li className="list-group-item form-control">
        <p>
          event ID: <input
          className="float-end form-control"
          value={event._id}
          onChange={(e) => dispatch(setEvent({ ...event, _id: e.target.value }))}
          />
        </p>
        <p>
          event Name: <input
          className="float-end form-control"
          value={event.name}
          onChange={(e) => dispatch(setEvent({ ...event, name: e.target.value }))}
          />
        </p>
        <p>
          event Number: <input
          className="float-end form-control"
          value={event.number}
          onChange={(e) => dispatch(setEvent({ ...event, number: e.target.value }))}
          />
        </p>
        <p>
          event Start Date: <input
          className="float-end form-control"
          value={event.startDate}
          onChange={(e) => dispatch(setEvent({ ...event, startDate: e.target.value }))}
          />
        </p>
        <p>
          event End Date: <input
          className="float-end form-control"
          value={event.endDate}
          onChange={(e) => dispatch(setEvent({ ...event, endDate: e.target.value }))}
          />
        </p>
          <button className="float-end btn btn-primary mt-2" onClick={() => dispatch(updateEvent(event))}> Update </button>
          <button className="float-end btn btn-success mt-2 me-2" onClick={() => dispatch(addEvent(event))}> Add </button>
      </li>
    </ul>
  );
}
export default EventForm;