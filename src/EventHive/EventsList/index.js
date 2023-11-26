import { React } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import EventList from "../../components/Events/EventList";
import "../style.css";

function EventsList() {
  return (
    <div>
      <div className="result-events-container">
        <EventList />
      </div>
      <div>
        <SearchForm />
      </div>
    </div>
  );
}
export default EventsList;