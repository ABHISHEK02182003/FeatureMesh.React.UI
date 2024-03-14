import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from './logo.png';
import { Login } from '../Login/Login';
import { Logout } from '../Login/Logout';
import { WelcomeName } from '../Login/WelcomeName';
import { useIsAuthenticated } from "@azure/msal-react";

const Navbar: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <span className="app-name">FeatureMesh</span>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-button">Home</Link>
        <div
          className="dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isAuthenticated && (
            <React.Fragment>
              <div className="nav-button">Publish</div>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <Link to="/publish/entity" className="dropdown-option">Entity</Link>
                  <Link to="/publish/feature" className="dropdown-option">Feature</Link>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
        { isAuthenticated && <Link to="/search" className="nav-button">Search</Link> }
        { isAuthenticated && <WelcomeName /> }
        { isAuthenticated ? <Logout /> : <Login /> }
      </div>
    </header>
  );
}

export default Navbar;
