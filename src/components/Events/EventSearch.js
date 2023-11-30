import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import { API_KEY } from './client';
import { Link } from 'react-router-dom';

import { setEvents } from "./EventsReducer";
import "./style.css";

import * as client from "./client";
import EventItem from "./EventItem";

function EventSearch({ searchQuery }) {
  const events = useSelector((state) => state.EventsReducer.events);
  const dispatch = useDispatch();
  const defaultImgUrl = "http://res.cloudinary.com/dif777yh9/image/upload/v1701296949/cld-sample-4";

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const filteredEvents = searchQuery
    ? events.filter(event => 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : events;

  useEffect(() => {
    if (!searchQuery) return;
    const queryStrings = filteredEvents.length === 0 ? "" : filteredEvents.map(event => 
      `${event.name} ${event.location}`
    );
  
    const combinedQuery = queryStrings.length === 0 ? searchQuery : queryStrings.join(" ");

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(combinedQuery)}&cx=b715962cdd6674cfe&key=${API_KEY}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResults(data.items); 
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;  

  return (
    <div className='row'>
      <div className='col'>
        
        <div className="row row-cols-1 d-flex flex-row flex-wrap">
          {filteredEvents.length === 0 ? (
            <div className="col">
              <h4 className="space-letter">There is no event found</h4>
            </div>
          ) : (
            <>
              <h4 className="space-letter ms-2">Related Events</h4>
              {filteredEvents.map((eventItem) => (
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
      <div className='col'>
      <h4 className="space-letter">More Info Form Google</h4>
        <div className='card api-search-container'>
          {results.map((item, index) => (
            <div key={index}>
              <h5 className='ms-2 wd-fg-color-white'>{item.title}</h5>
              <p className='ms-2 wd-fg-color-white'>{item.snippet}</p>
              <Link className='ms-2 btn btn-outline-white' to={item.link} target="_blank" rel="noopener noreferrer">Read more</Link>
              <hr/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default EventSearch;