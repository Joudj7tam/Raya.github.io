import React, { useState } from "react";
import "../CSS/homeNavbar.css";
import logo from "../assets/whiteLogo.png";
import lang from "../assets/language.svg";
import { FaBars, FaTimes } from "react-icons/fa";

function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="الشعار" className="logo" />
      </div>

      <button className="mobile-menu-button" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="#" onClick={() => setIsOpen(false)}>تواصل معنا</a>
        <a href="#" onClick={() => setIsOpen(false)}>الخريطة التفاعلية</a>
        <a href="#" onClick={() => setIsOpen(false)}>الأحداث</a>
        <a href="#" onClick={() => setIsOpen(false)}>الرئيسية</a>
        <a href="#" className="lang-link" onClick={() => setIsOpen(false)}>
          <img src={lang} alt="اللغة" className="lang-icon" />
          English
        </a>
      </div>
    </nav>
  );
}

export default HomeNavbar;