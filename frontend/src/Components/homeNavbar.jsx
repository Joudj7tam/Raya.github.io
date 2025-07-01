import React from "react";
import "../CSS/homeNavbar.css";
import logo from "../assets/whiteLogo.png";
import lang from "../assets/language.svg";

function HomeNavbar() {
  return (
    <nav className="navbar">
        <img src={logo} alt="الشعار" className="logo" />
      <div className="nav-links">
        <a href="#" className="lang-link">English
          <img src={lang} alt="اللغة" className="lang-icon" />
        </a>
        <a href="#">الرئيسة</a>
        <a href="#">الأحداث</a>
        <a href="#">الخريطة التفاعلية</a>
        <a href="#">تواصل معنا</a>
      </div>
    </nav>
  );
}

export default HomeNavbar;
