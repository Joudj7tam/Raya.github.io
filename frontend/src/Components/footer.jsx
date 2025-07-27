import React from "react";
import logo from "../assets/ddclogo-white.png";
import "../CSS/footer.css";
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Footer sections: Portal info, Support, and Contact */}
                <div className="footer-sections">
                    <div className="footer-section">
                        <h4>البوابة</h4>
                        <p>عن البوابة</p>
                    </div>
                    <div className="footer-section">
                        <h4>الدعم</h4>
                        <p>الأسئلة الشائعة</p>
                        <p>مركز الدعم</p>
                    </div>
                    <div className="footer-section">
                        <h4>التواصل</h4>
                        {/* Social media icons */}
                        <div className="footer-icons">
                            <FaLinkedinIn />
                            <FaInstagram />
                            <FaFacebookF />
                            <FaXTwitter />
                        </div>
                    </div>
                </div>

                {/* Footer logo */}
                <div className="footer-logo">
                    <img src={logo} alt="DDC Logo" />
                </div>
            </div>

            {/* Separator line */}
            <hr className="footer-line" />
        </footer>
    );
};

export default Footer;
