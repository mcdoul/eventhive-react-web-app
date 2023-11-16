import React from 'react';
import "./style.css";
import "../../lib/font-awesome/css/font-awesome.css";
import "../../lib/bootstrap/bootstrap.min.css";

function SearchForm() {
  return (
    <div className="searchform-position">
      <form action="#" className="searchform order-lg-last">
        <div className="form-group d-flex">
          <input type="text" className="form-control pl-3" placeholder="Search Events" />
          <button type="submit" className="form-control search">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
