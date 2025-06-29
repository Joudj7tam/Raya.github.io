import React from "react";

export const Navbar = () => {
    return (
        <nav className="w-full bg-white py-4 px-6 shadow-md">
            <div className="container mx-auto flex items-center justify-between flex-row-reverse">
                {/* الروابط اليمنى */}
                <ul className="flex items-center gap-8 text-sm font-medium text-foreground rtl">
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

                {/* اللغة */}
                <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c3 0 5-2 5-5S15 2 12 2 7 4 7 7s2 5 5 5zm0 0v7" />
                    </svg>
                    English
                </div>

                {/* الشعار */}
                <div className="flex items-center">
                    <img src="/logo.png" alt="DDC Logo" className="h-10 w-auto" />
                </div>
            </div>
        </nav>
    );
};