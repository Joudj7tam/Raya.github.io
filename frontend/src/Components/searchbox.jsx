// SearchBox.jsx
import React from 'react';
import { IoSearch } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import '../CSS/searchbox.css';

const SearchBox = ({ searchInput, setSearchInput,
    handleKeyDown, handleReset,
    sortOrder, setSortOrder,
    selectedEra, setSelectedEra,
    selectedType, setSelectedType,
    selectedResult, setSelectedResult }) => {

    return (
        <div className="search-box" dir="rtl">

            <div className="search-and-sort">
                <div className="search-input">
                    <input
                        type="text"
                        placeholder="البحث عن حدث..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <IoSearch className="search-icon" />
                </div>

                <div className="sort-options">
                    <label>
                        <input
                            type="radio"
                            name="sort"
                            value="asc"
                            checked={sortOrder === 'asc'}
                            onChange={(e) => setSortOrder(e.target.value)}
                        />
                        من الأقدم إلى الأحدث
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="sort"
                            value="desc"
                            checked={sortOrder === 'desc'}
                            onChange={(e) => setSortOrder(e.target.value)}
                        />
                        من الأحدث إلى الأقدم
                    </label>
                </div>
            </div>

            <div className="filters">

                <div className="filter-dropdown">
                    <button className="filter-button">
                        {selectedEra ? selectedEra : "العهد"} <IoIosArrowDown style={{position: "relative", top: "2px", left: "-5px" }} />
                    </button>
                    <div className="dropdown-menu">
                        <div onClick={() => setSelectedEra('النبي محمد ﷺ')}>عهد النبي محمد ﷺ</div>
                        <div onClick={() => setSelectedEra('أبو بكر الصديق رضي الله عنه')}>عهد الخليفة ابو بكر الصديق</div>
                        <div onClick={() => setSelectedEra('عمر بن الخطاب رضي الله عنه')}>عهد الخليفة عمر بن الخطاب</div>
                        <div onClick={() => setSelectedEra('عثمان بن عفان رضي الله عنه')}>عهد الخليفة عثمان بن عفان</div>
                        <div onClick={() => setSelectedEra('علي بن أبي طالب رضي الله عنه')}>عهد الخليفة علي بن ابي طالب</div>
                        <div onClick={() => setSelectedEra('')}>إلغاء التصفية</div>
                    </div>
                </div>

                <div className="filter-dropdown">
                    <button className="filter-button">
                        {selectedType ? selectedType : "نوع الحدث"} <IoIosArrowDown style={{position: "relative", top: "2px", left: "-5px" }} />
                    </button>
                    <div className="dropdown-menu">
                        <div onClick={() => setSelectedType('فتح')}>فتح</div>
                        <div onClick={() => setSelectedType('معركة')}>معركة</div>
                        <div onClick={() => setSelectedType('غزوة')}>غزوة</div>
                        <div onClick={() => setSelectedType('')}>إلغاء التصفية</div>
                    </div>
                </div>

                <div className="filter-dropdown">
                    <button className="filter-button">
                        {selectedResult ? selectedResult : "نتيجة الحدث"} <IoIosArrowDown style={{position: "relative", top: "2px", left: "-5px" }} />
                    </button>
                    <div className="dropdown-menu">
                        <div onClick={() => setSelectedResult('انتصار')}>انتصار</div>
                        <div onClick={() => setSelectedResult('هزيمة')}>هزيمة</div>
                        <div onClick={() => setSelectedResult('لم يحدث قتال')}>لم يحدث قتال</div>
                        <div onClick={() => setSelectedResult('')}>إلغاء التصفية</div>
                    </div>
                </div>
            </div>

            <div className="reset">
                <button className="reset-button" onClick={handleReset}>
                إعادة الضبط
                <GrPowerReset />
                </button>
            </div>
            {/* <div className="date-range">
                <span className="label">التاريخ</span>
                <span>هـ 2</span>
                <input type="range" min="2" max="39" className="range-slider" />
                <span>هـ 39</span>
            </div> */}

        </div>
    );
};

export default SearchBox;