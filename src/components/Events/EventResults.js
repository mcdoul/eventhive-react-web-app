import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EventList from './EventList';

function EventResults() {
  const location = useLocation(); 
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('query')); 
  }, [location]);

  return (
    <div>
        <EventList searchQuery={searchQuery} />
    </div>
  );
}

export default EventResults;
