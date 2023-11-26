import React from 'react';

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import EventHive from './EventHive';

function App() {
	return (
		<HashRouter>
			<div className='background'>
				<Routes>
					<Route path='/' element={<Navigate to='/EventHive' />} />
					<Route path='/EventHive/*' element={<EventHive />} />
				</Routes>
			</div>
		</HashRouter>
	);
}

export default App;
