import React, { useState } from "react";
import logo from '../assets/ddclogo.png';
import lang from "../assets/blacklanguage.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../CSS/navbar.css';

const Navbar = () => {
  // State to track if mobile menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Toggle mobile menu open/close state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar2">

      {/* Logo section */}
      <div className="logo-container">
        <img src={logo} alt="الشعار" className="logo" />
      </div>

      {/* Mobile menu toggle button */}
      <button className="mobile-menu-button2" onClick={toggleMenu}>
        {/* Show close icon if menu is open, otherwise hamburger icon */}
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Add "open" class when menu is open to show menu on small screens */}
      <div className={`nav-links2 ${isOpen ? "open" : ""}`}>
        
        {/* Each link closes the mobile menu on click */}
        <Link to="/" state={{ scrollTo: 'contact' }} onClick={() => setIsOpen(false)}>تواصل معنا</Link>
        <Link to="/" state={{ scrollTo: 'map' }} onClick={() => setIsOpen(false)}>الخريطة التفاعلية</Link>
        <Link to="/" state={{ scrollTo: 'timeline' }} onClick={() => setIsOpen(false)}>الخط الزمني</Link>
        <Link to="/events" onClick={() => setIsOpen(false)}>الأحداث</Link>
        <Link to="/" onClick={() => setIsOpen(false)}>الرئيسية</Link>

        {/* <a href="#" className="lang-link2" onClick={() => setIsOpen(false)}>
          <img src={lang} alt="اللغة" className="lang-icon2" />
          <span> English </span>
        </a> */}

      </div>
    </nav>
  );
};

export default Navbar;
