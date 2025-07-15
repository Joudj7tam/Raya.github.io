import React, { useState, useEffect, useRef } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../CSS/timeline.css";

export default function Timeline() {
  useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timelineRef = useRef(null);
  const [eventsByYear, setEventsByYear] = useState([]);
  const [timelineData, setTimelineData] = useState([]);


  const goNext = () => {
    if (!isAnimating && active < timelineData.length - 1) {
      setIsAnimating(true);
      setActive(active + 1);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const goPrev = () => {
    if (!isAnimating && active > 0) {
      setIsAnimating(true);
      setActive(active - 1);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  useEffect(() => {
  const fetchYears = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/gazwa/years");
      const data = await response.json();
      if (data.success) {
        const formatted = data.data.map((year) => ({ year: `${year} هـ` }));
        setTimelineData(formatted);
      }
    } catch (err) {
      console.error("❌ Error loading years:", err.message);
    }
  };

  fetchYears();
}, []);

 useEffect(() => {
  const fetchEventsByYear = async () => {
    if (timelineData.length === 0 || !timelineData[active]) return;

    const selectedYearStr = timelineData[active].year.replace(" هـ", "");
    const selectedYear = parseInt(selectedYearStr, 10);

    if (isNaN(selectedYear)) {
      console.error("Invalid year:", timelineData[active].year);
      setEventsByYear([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/gazwa/by-year?year=${selectedYear}`);
      const data = await response.json();

      if (data.success) {
        setEventsByYear(data.data);
      } else {
        setEventsByYear([]);
        console.error("❌ Failed:", data.message);
      }
    } catch (err) {
      console.error("🚨 Fetch Error:", err.message);
      setEventsByYear([]);
    }
  };

  fetchEventsByYear();
}, [active, timelineData]);




  return (
    <div className="timeline-wrapper" ref={timelineRef}>
      <div className="years-nav-line" data-aos="slide-left">
  <div className="years-line"></div>
  {timelineData.map((item, index) => {
    const offset = index - active;
    const absOffset = Math.abs(offset);
    if (absOffset > 2) return null;

    return (
      <div
        key={index}
        className={`year-circle ${index === active ? "active" : ""}`}
        onClick={() => !isAnimating && setActive(index)}
        style={{
          transform: `scale(${1 - 0.2 * absOffset})`,
          opacity: `${1 - 0.3 * absOffset}`,
          filter: absOffset === 2 ? "blur(1px)" : "none",
        }}
      >
        <div className="year-text">{item.year}</div>
        <div className="circle"><div className="inside-circle"></div></div>
      </div>
    );
  })}
</div>


      <div className="timeline-content" data-aos="fade-up">
        <button className="arrow left" onClick={goPrev} disabled={active === 0 || isAnimating}>
          ‹
        </button>

        <div className="slider">
          {timelineData.map((item, index) => {
            const offset = index - active;
            const absOffset = Math.abs(offset);
            const translateX = offset * -120;
            const scale = 1 - 0.15 * absOffset;
            const rotateY = offset === 0 ? "0deg" : offset > 0 ? "-15deg" : "15deg";
            const blur = absOffset >= 3 ? "blur(6px)" : "blur(2px)";
            const opacity = absOffset > 2 ? 0 : 1;

            return (
              <div
                key={index}
                className={`item ${index === active ? "active" : ""}`}
                style={{
                  transform: `translateX(${translateX}px) scale(${scale}) perspective(800px) rotateY(${rotateY})`,
                  zIndex: 100 - absOffset,
                  filter: index === active ? "none" : `${blur} brightness(0.6)`,
                  opacity: index === active ? 1 : opacity,
                  boxShadow: index === active ? "0 12px 24px rgba(0,0,0,0.3)" : "none",
                }}
              >
                <h3>الغزوات والفتوحات عام {timelineData[active]?.year}</h3>
                <div className="list">
                  <ul data-aos="fade-up">
  {eventsByYear.length > 0 ? (
    eventsByYear.map((event, index) => (
      <li key={index}>
        <strong>{event.name}</strong>
      </li>
    ))
  ) : (
    <>
      <li style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem' }}>
        لا توجد أحداث مسجلة في هذه السنة
      </li>
    </>
  )}
</ul>



                </div>
              </div>
            );
          })}
        </div>

        <button className="arrow right" onClick={goNext} disabled={active === timelineData.length - 1 || isAnimating}>
          ›
        </button>
      </div>
      {timelineData.length === 0 || eventsByYear.length === 0 ? (
  <div className="no-results-timeline">لا توجد نتائج</div>
) : null}
    </div>
    
  );
  
}
