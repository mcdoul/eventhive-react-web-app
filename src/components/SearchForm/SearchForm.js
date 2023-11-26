import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";
import "../../lib/font-awesome/css/font-awesome.css";
import "../../lib/bootstrap/bootstrap.min.css";

function SearchForm() {
  const [query, setQuery] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/EventHive/searchresult?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="searchform-position">
      <form onSubmit={handleSubmit} className="searchform order-lg-last">
        <div className="form-group d-flex">
          <input
            type="text"
            className="form-control pl-3"
            placeholder="Search Events"
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
          />
          <button type="submit" className="form-control search">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
