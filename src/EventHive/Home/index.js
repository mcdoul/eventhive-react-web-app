import React from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import EventList from "../../components/Events/EventList";
import "../style.css";

function Home () {
    return (
        <div>
            <div className="result-events-container">
                <h4 className="wd-fg-color-white">Recommendations for anonymous users / Recent events created by the logged in user </h4>
                <EventList />
            </div>
            <div>
                <SearchForm />
            </div>
        </div>
        
    );
}

export default Home;