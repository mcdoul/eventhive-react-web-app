import { React } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import EventResults from "../../components/Events/EventResults";
import "../style.css";

function SearchResult() {
  return (
    <div>
      <div className="result-events-container">
        <EventResults />
      </div>
      <div>
        <SearchForm />
      </div>
    </div>
  );
}
export default SearchResult;