import React, { useState, useEffect, useRef } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../CSS/timeline.css";

const timelineData = [
  { year: "2 هـ", title: "عهد عمر بن الخطاب", description: ["غزوة بدر", "غزوة أحد", "غزوة الخندق", "غزوة بني قريظة"] },
  { year: "3 هـ", title: "عهد أبوبكر الصديق", description: ["غزوة ذي العشيرة", "غزوة بواط", "غزوة سفوان", "غزوة بدر الأولى"] },
  { year: "4 هـ", title: "عهد عثمان بن عفان", description: ["غزوة بني النضير", "غزوة بدر الآخرة", "غزوة دومة الجندل", "غزوة الخبط"] },
  { year: "5 هـ", title: "عهد علي بن أبي طالب", description: ["غزوة بني المصطلق", "غزوة الحديبية", "غزوة خيبر", "غزوة ذات الرقاع"] },
  { year: "6 هـ", title: "عهد النبي محمد", description: ["غزوة مؤتة", "فتح مكة", "غزوة حنين", "غزوة الطائف"] },
  { year: "7 هـ", title: "عهد عمر بن الخطاب", description: ["غزوة تبوك", "حجة الوداع", "سرية أسامة", "وفاة الرسول"] },
  { year: "5 هـ", title: "عهد علي بن أبي طالب", description: ["غزوة بني المصطلق", "غزوة الحديبية", "غزوة خيبر", "غزوة ذات الرقاع"] },
  { year: "6 هـ", title: "عهد النبي محمد", description: ["غزوة مؤتة", "فتح مكة", "غزوة حنين", "غزوة الطائف"] },
  { year: "7 هـ", title: "عهد عمر بن الخطاب", description: ["غزوة تبوك", "حجة الوداع", "سرية أسامة", "وفاة الرسول"] },
];

export default function Timeline() {
  useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timelineRef = useRef(null);

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
                <h3>{item.title}</h3>
                <div className="list">
                  <ul>
                    {item.description.map((ghazwa, i) => (
                      <li key={i}>{ghazwa}</li>
                    ))}
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
    </div>
  );
}
