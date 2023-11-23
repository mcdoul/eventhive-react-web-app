import React from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import EventListHome from "../../components/Events/EventListHome";

function Home () {
    return (
        <div>
            <div>
                <h4 className="wd-fg-color-white">Recommendations for anonymous users / Recent events created by the logged in user </h4>
                <EventListHome />
            </div>
            <div>
                <SearchForm />
            </div>
        </div>
        
    );
}

export default Home;