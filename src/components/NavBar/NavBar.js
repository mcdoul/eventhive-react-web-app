import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../EventHive/Auth/client';
import './style.css';
import '../../lib/font-awesome/css/font-awesome.css';
import '../../lib/bootstrap/bootstrap.min.css';


function NavBar({ auth: { isAuthenticated }, logout }) {
	const links = [
		{ text: 'Home', path: '/' },
		{ text: 'View All Events', path: '/EventHive/eventslist' },
		{ text: 'Meet Our Team', path: '/EventHive/ourteam' },
	];

	const { pathname } = useLocation();

	return (
		<div className='site-navbar mt-3'>
			<div className='container-fluid'>
				<div className='row align-items-center'>
					<div className='site-logo'>
						<Link to='/'>EVENTHIVE</Link>
					</div>
					<nav className='site-navigation'>
						<ul className='site-menu js-clone-nav d-none d-xl-block'>
							{links.map((link, index) => (
								<li key={index}>
									<Link
										to={link.path}
										className={`nav-link ${
											pathname === link.path ? 'active' : ''
										}`}>
										{link.text}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					{isAuthenticated ? (
						<div className='right-cta-menu'>
              				<Link
								to='/EventHive/profile'
								className='btn btn-outline-white border-width-2 d-lg-inline-block me-2'>
								View My Profile

							</Link>
							<Link to="/EventHive/events/new" className="btn btn-outline-white me-2"> Create Event</Link>
							<Link to='/EventHive'
								onClick={logout}
								className='btn btn-outline-white border-width-2 d-lg-inline-block'>
								Logout
							</Link>
						</div>
						) : (
						<div className='right-cta-menu'>
							<Link
								to='/EventHive/signup'
								className='btn btn-outline-white border-width-2 d-lg-inline-block me-2'>
								Sign Up
							</Link>
							<Link
								to='/EventHive/login'
								className='btn btn-outline-white border-width-2 d-lg-inline-block'>
								Login
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

NavBar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
