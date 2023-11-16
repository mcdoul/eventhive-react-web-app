import React from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import CourseList from "../../components/courses/CourseList";

function Home () {
    return (
        <div>
            <div>
                <h4 className="wd-fg-color-white">Recommendations for anonymous users / Recent events created by the logged in user </h4>
                <CourseList />
            </div>
            <div>
                <SearchForm />
            </div>
        </div>
        
    );
}

export default Home;