import React from "react";
import { useDispatch } from "react-redux";
import { deleteCourse, setCourse } from "./CourseReducer";
import { Link } from "react-router-dom";

function CourseItem({ course }) {
  const dispatch = useDispatch();
  
  return (
    <div>
      <h5 className="card-title">
        <Link to={`/Kanbas/Courses/${course._id}`} className="wd-fg-color-white">
          {course.number} {course.name}
        </Link>
      </h5>
      <p className="card-text">
        {/* Course ID: {course._id}  */}
        Start from {course.startDate} to {course.endDate}
      </p>
      <div>
      <button className="btn btn-outline-white" onClick={() => dispatch(deleteCourse(course._id))}> View {course.name} </button>
      </div>
    </div>
  );
}
export default CourseItem;