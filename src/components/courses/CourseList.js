import React from "react";
import CourseItem from "./CourseItem";
import { useSelector } from "react-redux";
import "./style.css";

function CourseList() {
  const { courses } = useSelector((state) => state.CourseReducer);
  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-4 d-flex flex-row flex-wrap">
        {courses.map((course, index) => (
          <div key={course._id} className="col">
            <div className="card image-container">
              <img
                src={`/pics/${index + 1}.png`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <CourseItem course={course} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CourseList;

