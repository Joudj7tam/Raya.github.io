import React from "react";
import "../CSS/homeNavbar.css";
import logo from "../assets/whiteLogo.png";
import lang from "../assets/language.svg";

function HomeNavbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="الشعار" className="logo" />
      </div>

      <div className="nav-links">
        <a href="#">تواصل معنا</a>
        <a href="#">الخريطة التفاعلية</a>
        <a href="#">الأحداث</a>
        <a href="#">الرئيسة</a>
        <a href="#" className="lang-link">
          <img src={lang} alt="اللغة" className="lang-icon" />
          English
        </a>
      </div>
    </nav>
  );
}

export default HomeNavbar;
