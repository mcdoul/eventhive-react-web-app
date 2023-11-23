import { React } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import EventList from "../../components/Events/EventList";

function EventsList() {
  return (
    <div>
      <div>
        <SearchForm />
      </div>
      <div>
        <h4 className="wd-fg-color-white">All Events List / Search Results / or separate</h4>
        <EventList />
      </div>
      
    </div>
  );
}
export default EventsList;