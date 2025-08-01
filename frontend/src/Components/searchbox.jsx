import React from 'react';
import { IoSearch } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import '../CSS/searchbox.css';

const SearchBox = ({ 
  searchInput, setSearchInput, handleReset,
  sortOrder, setSortOrder,
  selectedEra, setSelectedEra,
  selectedType, setSelectedType,
  selectedResult, setSelectedResult 
}) => {

  return (
    <div className="search-box" dir="rtl">

      {/* Search input and sort radio buttons */}
      <div className="search-and-sort">
        <div className="search-input">
          <input
            type="text"
            placeholder="البحث عن حدث..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <IoSearch className="search-icon" />
        </div>

        {/* Sort order options */}
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

      {/* Filters dropdowns */}
      <div className="filters">

        {/* Era filter */}
        <div className="filter-dropdown">
          <button className="filter-button">
            <span>
              {/* Show selected era or placeholder */}
              {selectedEra || "العهد"}
              {/* Clear filter button */}
              {selectedEra && (
                <span className="clear-filter" onClick={() => setSelectedEra('')}> ✕ </span>
              )}
            </span>
            {/* Dropdown arrow shown only if no era selected */}
            {!selectedEra && (
              <IoIosArrowDown style={{ position: "relative", top: "2px", left: "-5px" }} />
            )}
          </button>
          {/* Dropdown menu options */}
          <div className="dropdown-menu">
            <div onClick={() => setSelectedEra('النبي محمد ﷺ')}>عهد النبي محمد ﷺ</div>
            <div onClick={() => setSelectedEra('أبو بكر الصديق رضي الله عنه')}>عهد الخليفة ابو بكر الصديق</div>
            <div onClick={() => setSelectedEra('عمر بن الخطاب رضي الله عنه')}>عهد الخليفة عمر بن الخطاب</div>
            <div onClick={() => setSelectedEra('عثمان بن عفان رضي الله عنه')}>عهد الخليفة عثمان بن عفان</div>
            <div onClick={() => setSelectedEra('علي بن أبي طالب رضي الله عنه')}>عهد الخليفة علي بن ابي طالب</div>
          </div>
        </div>

        {/* Event Type filter */}
        <div className="filter-dropdown">
          <button className="filter-button">
            <span>
              {selectedType || "نوع الحدث"}
              {selectedType && (
                <span
                  className="clear-filter"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedType('');
                  }}
                >
                  ✕
                </span>
              )}
            </span>
            {!selectedType && (
              <IoIosArrowDown style={{ position: "relative", top: "2px", left: "-5px" }} />
            )}
          </button>
          <div className="dropdown-menu">
            <div onClick={() => setSelectedType('فتح')}>فتح</div>
            <div onClick={() => setSelectedType('معركة')}>معركة</div>
            <div onClick={() => setSelectedType('غزوة')}>غزوة</div>
          </div>
        </div>

        {/* Event Result filter */}
        <div className="filter-dropdown">
          <button className="filter-button">
            <span>
              {selectedResult || "نتيجة الحدث"}
              {selectedResult && (
                <span
                  className="clear-filter"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedResult('');
                  }}
                >
                  ✕
                </span>
              )}
            </span>
            {!selectedResult && (
              <IoIosArrowDown style={{ position: "relative", top: "2px", left: "-5px" }} />
            )}
          </button>
          <div className="dropdown-menu">
            <div onClick={() => setSelectedResult('انتصار')}>انتصار</div>
            <div onClick={() => setSelectedResult('هزيمة')}>هزيمة</div>
            <div onClick={() => setSelectedResult('لم يحدث قتال')}>لم يحدث قتال</div>
          </div>
        </div>

        {/* Reset all filters button */}
        <div className="reset">
          <button className="reset-button" onClick={handleReset}>
            <span>إعادة الضبط</span> 
            <GrPowerReset />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchBox;
