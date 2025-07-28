import React, { useState } from "react";
import "../CSS/homeNavbar.css";
import logo from "../assets/whiteLogo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';

function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle mobile menu open/close state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="الشعار" className="logo" />
      </div>

      {/* Mobile menu toggle button */}
      <button className="mobile-menu-button" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation links */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        {/* Anchors scroll to page sections */}
        <a href="#contact" onClick={() => setIsOpen(false)}>تواصل معنا</a>
        <a href="#map" onClick={() => setIsOpen(false)}>الخريطة التفاعلية</a>
        <a href="#timeline" onClick={() => setIsOpen(false)}>الخط الزمني</a>
        {/* React Router Link for Events page */}
        <Link to="/events" onClick={() => setIsOpen(false)}>الأحداث</Link>
        <a href="#home" onClick={() => setIsOpen(false)}>الرئيسية</a>

        {/* Language switcher commented out */}
        {/* 
        <a href="#" className="lang-link" onClick={() => setIsOpen(false)}>
          <img src={lang} alt="اللغة" className="lang-icon" />
          English
        </a>
        */}
      </div>
    </nav>
  );
}

export default HomeNavbar;
