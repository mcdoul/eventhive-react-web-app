import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';

import { setEvent, deleteEvent } from "../Events/EventsReducer";
import * as client from "../Events/client"


import "./style.css";
import PropTypes from 'prop-types';

const EventDetail = ({auth: { isAuthenticated, user }}) => {
  const { eventId } = useParams();
  const eventData = useSelector(state => state.EventsReducer.event);
  const dispatch = useDispatch();
  const [isRegistered, setIsRegistered] = useState(false);
  const [commentText, setCommentText] = useState('');
  const defaultImgUrl = "http://res.cloudinary.com/dif777yh9/image/upload/v1701296949/cld-sample-4";

  const fetchEvent = async () => {
    try {
      const eventData = await client.findEvent(eventId);
      setIsRegistered(eventData?.attendance_id?.includes(user.email));
      dispatch(setEvent(eventData));
    } catch (error) {
      console.error("Failed to fetch event:", error);
    }
  };

  const handleDeleteEvent = (eventId) => {
    client.deleteEvent(eventId).then((status) => {
      dispatch(deleteEvent(eventId));
    });
  };

  const handleRegister = async () => {
    if (!isRegistered) {
      try {
        await client.registerUserForEvent(eventData._id, eventData.name, user.email);
        setIsRegistered(true);
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if(isAuthenticated){
      try {
        const newComment = {
          userEmail: user.email, 
          content: commentText,
        };
        await client.addCommentToEvent(eventId, user.email, commentText);
        setCommentText('');
        fetchEvent(); 
      } catch (error) {
        console.error("Failed to submit comment:", error);
      }
    }
    else{
      alert("Please log in to submit a comment.");
    }
  };

  const formatDate = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      if (!isNaN(date)) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
    }
    return 'N/A'; 
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
          {isAuthenticated && (
            user.email === eventData.organizer_id ? (
              <div>
                <Link to={`/EventHive/events/edit/${eventId}`}>
                  <button className="btn btn-pink me-2 btn-small">Edit</button>
                </Link>
                <Link to={`/EventHive`}>
                  <button className="btn btn-pink btn-small" onClick={() => handleDeleteEvent(eventId)}>Delete</button>
                </Link>
              </div>
            ) : (
              <button onClick={handleRegister} className="btn btn-pink" disabled={isRegistered} >
                {isRegistered ? 'Registered' : 'Register / Get Ticket'}
              </button>
            )
          )}
          <div className="info-item">
            <span className="info-title">Date</span>
            <p className="info-content">{eventData.startDate && formatDate(eventData.startDate)} to {eventData.endDate && formatDate(eventData.endDate)}</p>
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
            <Link to={`/EventHive/profile/${eventData.organizer_id}`}>
              <div className='user-id info-content'>
                <span>{eventData.organizer_id}</span>
              </div>
            </Link>
          </div>
          <div className="info-item">
            <span className="info-title">Attendance</span>
            <p className="info-content">{eventData.attendance_id.length}</p>
          </div>
        </div>
        <div className="right-section flex-wrap">
          <img 
            src={eventData.imageUrl || defaultImgUrl} 
            className="card-img-top banner"
            alt={eventData.name}
          />
          <h1 className="event-title">{eventData.name}</h1>
          <h5 className="event-date">{eventData.startDate && formatDate(eventData.startDate)} to {eventData.endDate && formatDate(eventData.endDate)}</h5>
          <div className="info-item description">
            <p className="info-title">Description</p>
            <p className="info-content">{eventData.description}</p>
          </div>
          <div className="info-item comments">
            <p className="info-title">Comments</p>
            <div className="info-content">
            {eventData.comments && eventData.comments.map((comment, index) => (
              <div key={index}>
                <Link to={`/EventHive/profile/${comment.userEmail}`}>
                  <div className='user-id'>
                    - User <span>{comment.userEmail}</span>
                  </div>
                </Link>
                <p className='comment'>{comment.content}</p>
              </div>
            ))}
            </div>
            <form className='info-content' onSubmit={handleCommentSubmit}>
              <div className="form-group">
                <label htmlFor="userComment" className='user-id'>Your Comment</label>
                <textarea 
                  className="form-control comment-box" 
                  id="userComment" 
                  rows="4" 
                  placeholder="Write your comment here..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-small btn-pink" >Submit Comment</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

EventDetail.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(EventDetail);

