import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../CSS/detailbox.css";

const DetailsBox = ({ icon, title, text, className}) => {

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className={`detail-card ${className || ''}`} data-aos="fade-up">
            <img src={icon} alt="detail-icon"/>
            <div className="text-box"> 
                <h3 dir="rtl" lang="ar" >{title}</h3>
                <p dir="rtl" lang="ar">{text}</p>
            </div>
        </div >
    );
};

export default DetailsBox;
