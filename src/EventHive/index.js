import { Route, Routes } from "react-router";

import NavBar from "../components/NavBar/NavBar";
import Home from "./Home";
import Login from "./Auth/LogIn";
import SignUp from "./Auth/SignUp";
import EventsList from "./EventsList";
import Profile from "./Profile";
import Team from "./Team";
import EventsDetail from "./EventDetail";
import EventEditor from "./EventEditor";

import store from "./store";
import { Provider } from "react-redux";

import "./style.css";
import "../lib/font-awesome/css/font-awesome.css";
import "../lib/bootstrap/bootstrap.min.css";

function EventHive() {
  return (
    <Provider store={store}>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login"   element={<Login/>}/>
          <Route path="/signup"   element={<SignUp/>}/>
          <Route path="/ourteam"   element={<Team/>}/>
          <Route path="/profile"   element={<Profile/>}/>
          <Route path="/eventslist"   element={<EventsList/>}/>
          <Route path="/events/:eventId/*" element={<EventsDetail />} />
          <Route path="/events/new" element={<EventEditor/>} />
          <Route path="/events/edit/:eventId" element={<EventEditor/>} />
        </Routes>
      </div>
    </Provider>
  );
}
export default EventHive;
