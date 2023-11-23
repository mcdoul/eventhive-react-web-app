import { React } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import EventList from "../../components/Events/EventList";
import "../style.css";

function EventsList() {
  return (
    <div>
      <div className="result-events-container">
        <h4 className="wd-fg-color-white">All Events List / Search Results / or separate</h4>
        <EventList />
      </div>
      <div>
        <SearchForm />
      </div>
    </div>
  );
}
export default EventsList;