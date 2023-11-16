import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, updateCourse, setCourse } from "./CourseReducer";

function CourseForm() {
  const { course } = useSelector((state) => state.CourseReducer);
  const dispatch = useDispatch();
  return (
    <ul className="list-group mb-3" style={{width:350}}>
      <li className="list-group-item form-control">
        <p>
          Course ID: <input
          className="float-end form-control"
          value={course._id}
          onChange={(e) => dispatch(setCourse({ ...course, _id: e.target.value }))}
          />
        </p>
        <p>
          Course Name: <input
          className="float-end form-control"
          value={course.name}
          onChange={(e) => dispatch(setCourse({ ...course, name: e.target.value }))}
          />
        </p>
        <p>
          Course Number: <input
          className="float-end form-control"
          value={course.number}
          onChange={(e) => dispatch(setCourse({ ...course, number: e.target.value }))}
          />
        </p>
        <p>
          Course Start Date: <input
          className="float-end form-control"
          value={course.startDate}
          onChange={(e) => dispatch(setCourse({ ...course, startDate: e.target.value }))}
          />
        </p>
        <p>
          Course End Date: <input
          className="float-end form-control"
          value={course.endDate}
          onChange={(e) => dispatch(setCourse({ ...course, endDate: e.target.value }))}
          />
        </p>
          <button className="float-end btn btn-primary mt-2" onClick={() => dispatch(updateCourse(course))}> Update </button>
          <button className="float-end btn btn-success mt-2 me-2" onClick={() => dispatch(addCourse(course))}> Add </button>
      </li>
    </ul>
  );
}
export default CourseForm;