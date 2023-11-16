import { React } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import CourseList from "../../components/courses/CourseList";

function EventsList() {
  return (
    <div>
      <div>
        <SearchForm />
      </div>
      <div>
        <h4 className="wd-fg-color-white">All Events List / Search Results / or separate</h4>
        <CourseList />
      </div>
      
    </div>
  );
}
export default EventsList;