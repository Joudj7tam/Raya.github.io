import React from "react";
import logo from '../assets/ddclogo.png';
import lang from "../assets/blacklanguage.png";
import '../CSS/navbar.css';

const Navbar = () => {
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
                    <span> English </span>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;