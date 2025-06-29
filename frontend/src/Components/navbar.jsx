import React from "react";
import logo from '../assets/ddclogo.png';
import language from '../assets/blacklanguage.png';

export const Navbar = () => {
    return (
        <nav>
            <div>
                <ul>
                    <li>
                        <a href="#home" className="hover:text-primary transition-colors">الرئيسية</a>
                    </li>
                    <li>
                        <a href="#events" className="hover:text-primary transition-colors">الأحداث</a>
                    </li>
                    <li>
                        <a href="#map" className="hover:text-primary transition-colors">الخريطة التفاعلية</a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-primary transition-colors">تواصل معنا</a>
                    </li>
                </ul>

                <div>
                    <img src={language} alt="language" />
                    <span> English</span>
                </div>

                <div>
                    <img src={logo} alt="DDC Logo" />
                </div>
            </div>
        </nav>
    );
};