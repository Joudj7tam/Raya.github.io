import React, { useState } from "react";
import "../CSS/timeline.css";

const timelineData = [
  {
    year: 2,
    title: "عهد عمر بن الخطاب",
    description: "غزوة - غزوة - غزوة - غزوة",
  },
  {
    year: 3,
    title: "عهد عمر بن الخطاب",
    description: "غزوة - غزوة - غزوة - غزوة",
  },
  {
    year: 4,
    title: "عهد عمر بن الخطاب",
    description: "غزوة - غزوة - غزوة - غزوة",
  },
  {
    year: 5,
    title: "عهد عمر بن الخطاب",
    description: "غزوة - غزوة - غزوة - غزوة",
  },
  {
    year: 6,
    title: "عهد عمر بن الخطاب",
    description: "غزوة - غزوة - غزوة - غزوة",
  },
  {
    year: 7,
    title: "عهد عمر بن الخطاب",
    description: "غزوة - غزوة - غزوة - غزوة",
  },
];

export default function Timeline() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const goNext = () => {
    if (currentIndex < timelineData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="timeline-wrapper">
      <div className="years-nav">
        {timelineData.map((item, index) => (
          <button
            key={item.year}
            className={`year-button ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          >
            {item.year}
          </button>
        ))}
      </div>

      <div className="timeline-content">
        <button className="arrow left" onClick={goPrev} disabled={currentIndex === 0}>
          ‹
        </button>

        <div className="card">
          <h3>{timelineData[currentIndex].title}</h3>
          <p>{timelineData[currentIndex].description}</p>
        </div>

        <button className="arrow right" onClick={goNext} disabled={currentIndex === timelineData.length - 1}>
          ›
        </button>
      </div>
    </div>
  );
}
