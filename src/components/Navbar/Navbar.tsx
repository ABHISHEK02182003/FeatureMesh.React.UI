import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './navbar.css';
import logo from './logo.png';

const Navbar: React.FC = () => {
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
          <Link to="/publish" className="nav-button">Publish</Link>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <Link to="/publish/entity" className="dropdown-option">Entity</Link>
              <Link to="/publish/feature" className="dropdown-option">Feature</Link>
            </div>
          )}
        </div>
        <Link to="/search" className="nav-button">Search</Link>
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </header>
  );
}

export default Navbar;