import React, { useState } from "react";
import logo from '../assets/ddclogo.png';
import lang from "../assets/blacklanguage.png";
import { FaBars, FaTimes } from "react-icons/fa";
import '../CSS/navbar.css';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return (
        <nav className="navbar2">
            <div className="logo-container">
                <img src={logo} alt="الشعار" className="logo" />
            </div>

            <button className="mobile-menu-button2" onClick={toggleMenu}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`nav-links2 ${isOpen ? "open" : ""}`}>
                <a href="#" onClick={() => setIsOpen(false)}>تواصل معنا</a>
                <a href="#" onClick={() => setIsOpen(false)}>الخريطة التفاعلية</a>
                <a href="#" onClick={() => setIsOpen(false)}>الأحداث</a>
                <a href="#" onClick={() => setIsOpen(false)}>الرئيسية</a>
                <a href="#" className="lang-link2" onClick={() => setIsOpen(false)}>

                    <img src={lang} alt="اللغة" className="lang-icon2" />
                    <span> English </span>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;