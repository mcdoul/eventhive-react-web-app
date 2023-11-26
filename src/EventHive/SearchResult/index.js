import { React } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import EventResults from "../../components/Events/EventResults";
import "../style.css";

function SearchResult() {
  return (
    <div>
      <div className="result-events-container">
        <h4 className="wd-fg-color-white">Search Results</h4>
        <EventResults />
      </div>
      <div>
        <SearchForm />
      </div>
    </div>
  );
}
export default SearchResult;