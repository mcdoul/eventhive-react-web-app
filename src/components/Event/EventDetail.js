import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setEvent } from "../Events/EventsReducer";
import * as client from "../Events/client"

import "./style.css";

const EventDetail = () => {
  const { eventId } = useParams();
  const eventData = useSelector(state => state.EventsReducer.event);
  const dispatch = useDispatch();

  const fetchEvent = async () => {
    try {
      const eventData = await client.findEvent(eventId);
      dispatch(setEvent(eventData));
    } catch (error) {
      console.error("Failed to fetch event:", error);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (!eventData) {
    return <div>Loading event details...</div>;
  }


  return (
    <div>
      <div className="event-detail-container ">
        <div className="left-section">
          <a href={eventData.registrationLink} className="btn-pink">Register / Get Ticket</a>
          <div className="info-item">
            <span className="info-title">Date</span>
            <p className="info-content">{eventData.startDate} to {eventData.endDate}</p>
          </div>
          <div className="info-item">
            <span className="info-title">Location</span>
            <p className="info-content"> 📍 {eventData.location}</p>
          </div>
          <div className="info-item">
            <span className="info-title">Price</span>
            <p className="info-content">${eventData.price}</p>
          </div>
          <div className="info-item">
            <span className="info-title">Organizer</span>
            <p className="info-content">{eventData.organizer_id}</p>
          </div>
          <div className="info-item">
            <span className="info-title">Attendance</span>
            <p className="info-content">{eventData.attendance_id.length}</p>
          </div>
        </div>
        <div className="right-section flex-wrap">
          <img src={`/pics/1.png`} alt={eventData.name} className="event-image" />
          <h1 className="event-title">{eventData.name}</h1>
          <h5 className="event-date">{eventData.startDate} ~ {eventData.endDate}</h5>
          <div className="info-item description">
            <p className="info-title">Description</p>
            <p className="info-content">{eventData.description}</p>
          </div>
          <div className="info-item comments">
            <p className="info-title">Comments</p>
            <div className="info-content">
              {eventData.comments && eventData.comments.map(comment => (
                <div key={comment.userId}>
                  <div className='user-id'><strong>- User ID: {comment.userId}</strong></div>
                  <p className='comment'>{comment.content}</p>
                </div>
              ))}
            </div>
            <form className='info-content'>
              <div class="form-group">
                <label for="userComment" className='user-id'>Your Comment</label>
                <textarea class="form-control comment-box" id="userComment" rows="4" placeholder="Write your comment here..."></textarea>
              </div>
              <button type="submit" class="btn btn-small btn-pink">Submit Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
