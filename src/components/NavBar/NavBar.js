import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./style.css";
import "../../lib/font-awesome/css/font-awesome.css";
import "../../lib/bootstrap/bootstrap.min.css";

function NavBar() {
  const links = [
    { text: 'Home', path: '/' },
    { text: 'View All Events', path: '/EventHive/eventslist' },
    { text: 'Meet Our Team', path: '/EventHive/ourteam' },
  ];

  const { pathname } = useLocation();

  return (
    <div className="site-navbar mt-3">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="site-logo">
            <Link to="/" >
              EVENTHIVE 
            </Link>
          </div>

          <nav className="site-navigation">
            <ul className="site-menu js-clone-nav d-none d-xl-block">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`nav-link ${
                      pathname === link.path ? 'active' : ''
                    }`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="right-cta-menu">
            <Link to="/EventHive/signup" className="btn btn-outline-white border-width-2 d-lg-inline-block me-2">
              Sign Up
            </Link>
            <Link to="/EventHive/login" className="btn btn-outline-white border-width-2 d-lg-inline-block">
              Log In
            </Link>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default NavBar;
