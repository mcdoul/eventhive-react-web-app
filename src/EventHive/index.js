import React, { Fragment, useEffect } from 'react';

import { Route, Routes } from 'react-router';

import NavBar from '../components/NavBar/NavBar';
import Home from './Home';
import Login from './Auth/LogIn';
import SignUp from './Auth/SignUp';
import EventsList from './EventsList';
import Profile from './Profile';
import Team from './Team';
import EventsDetail from './EventsDetail';

import { Provider } from 'react-redux';
import { loadUser } from '../actions/auth';
import store from './store';

import './style.css';
import '../lib/font-awesome/css/font-awesome.css';
import '../lib/bootstrap/bootstrap.min.css';
import axios from 'axios';

if (localStorage.token) {
	axios.defaults.headers.common['x-auth-token'] = localStorage.token;
} else {
	delete axios.defaults.headers.common['x-auth-token'];
}

function EventHive() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<div>
				<NavBar />

				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/ourteam' element={<Team />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/eventslist' element={<EventsList />} />
					<Route path='/events/:eventId/*' element={<EventsDetail />} />
				</Routes>
			</div>
		</Provider>
	);
}
export default EventHive;
