import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EventSearch from './EventSearch';

function EventResults() {
  const location = useLocation(); 
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('query')); 
  }, [location]);

  return (
    <div>
      <EventSearch searchQuery={searchQuery} />
    </div>
  );
}

export default EventResults;
