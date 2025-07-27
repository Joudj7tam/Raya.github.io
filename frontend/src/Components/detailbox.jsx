import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../CSS/detailbox.css";

const DetailsBox = ({ icon, title, text, className }) => {

    // Initialize AOS animations on mount
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        // Wrapper div with optional additional class and fade-up animation
        <div className={`detail-card ${className || ''}`} data-aos="fade-up">
            {/* Icon image */}
            <img src={icon} alt="detail-icon" />
            
            {/* Text content with Arabic RTL direction */}
            <div className="text-box">
                <h3 dir="rtl" lang="ar">{title}</h3>
                <p dir="rtl" lang="ar">{text}</p>
            </div>
        </div>
    );
};

export default DetailsBox;
