import React from "react";
import "../CSS/detailbox.css";

const DetailsBox = ({icon, title, text}) => {
    return (
        <div className="detail-card">
            <img src={icon} alt="detail-icon"/>
            <div className="text-box"> 
                <h3 dir="rtl" lang="ar" >{title}</h3>
                <p dir="rtl" lang="ar">{text}</p>
            </div>
        </div>
    );
};

export default DetailsBox;
