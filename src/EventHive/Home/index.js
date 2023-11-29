import React from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import HomeEventList from "../../components/Events/HomeEventList";
import "../style.css";

function Home () {
    return (
        <div>
            <div className="events-list-container">
                <HomeEventList />
            </div>
            <div>
                <SearchForm />
            </div>
        </div>
        
    );
}

export default Home;