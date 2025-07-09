// SearchBox.jsx
import React from 'react';
import { IoSearch } from "react-icons/io5";
import '../CSS/searchbox.css';

const SearchBox = () => {
    return (
        <div className="search-box" dir="rtl">

            <div className="search-and-sort">
                <div className="search-input">
                    <input type="text" placeholder="البحث عن حدث..." />
                    <IoSearch className="search-icon" />
                </div>

                <div className="sort-options">
                    <label>
                        <input type="checkbox" />
                        من الأقدم إلى الأحدث
                    </label>
                    <label>
                        <input type="checkbox" />
                        من الأحدث إلى الأقدم
                    </label>
                </div>
            </div>

            <div className="filters">
                <div className="filter-dropdown">
                    <button className="filter-button">العهد الإسلامي</button>
                    <div className="dropdown-menu">
                        <div>عهد النبي محمد</div>
                        <div>عهد الخليفة ابو بكر الصديق</div>
                        <div>عهد الخليفة عمر بن الخطاب</div>
                        <div>عهد الخليفة عثمان بن عفان</div>
                        <div>عهد الخليفة علي بن ابي طالب</div>
                    </div>
                </div>

                <div className="filter-dropdown">
                    <button className="filter-button">نوع الحدث</button>
                    <div className="dropdown-menu">
                        <div>فتح</div>
                        <div>معركة</div>
                        <div>غزوة</div>
                    </div>
                </div>

                <div className="filter-dropdown">
                    <button className="filter-button">النتيجة النهائية</button>
                    <div className="dropdown-menu">
                        <div>انتصار</div>
                        <div>هزيمة</div>
                        <div>لم يحدث قتال</div>
                    </div>
                </div>


                {/* <select defaultValue="">
                    <option value="" disabled>العهد الإسلامي</option>
                    <option>عهد النبي محمد</option>
                    <option> عهد الخليفة ابو بكر الصديق</option>
                    <option> عهد الخليفة عمر بن الخطاب</option>
                    <option> عهد الخليفة عثمان بن عفان</option>
                    <option> عهد الخليفة علي بن ابي طالب</option>
                </select>

                <select defaultValue="">
                    <option value="" disabled>نوع الحدث</option>
                    <option>فتح</option>
                    <option>معركة</option>
                    <option>غزوة</option>
                </select>

                <select defaultValue="">
                    <option value="" disabled>النتيجة النهائية</option>
                    <option>انتصار</option>
                    <option>هزيمة</option>
                    <option>لم يحدث قتال</option>
                </select> */}
            </div>

            <div className="date-range">
                <span className="label">التاريخ</span>
                <span>هـ 2</span>
                <input type="range" min="2" max="39" className="range-slider" />
                <span>هـ 39</span>
            </div>

        </div>
    );
};

export default SearchBox;