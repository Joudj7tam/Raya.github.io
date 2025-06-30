import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import hero from "./assets/hero.png";
import camels from "./assets/camels.png";
import HomeNavbar from "./Components/homeNavbar";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </Router>
  );
}

// Separate component for home content
function HomeContent() {
  return (
    <>
    <HomeNavbar />
      <section className="hero">
        <img src={hero} alt="hero" />
        <h1>إِنَّ اللَّهَ يُحِبُّ الَّذينَ يُقاتِلونَ فى سَبيلِهِ صَفًّا كَأَنَّهُم بُنيانٌ مَرصوصٌ</h1>
        <h5>[الصف: 4 - 4]</h5>
      </section>
      <section className="about">
        <h3>
          هنا تُروى الغزوات والفتوحات الإسلامية، لا كصفحات في كتاب... بل كتجربة تفاعلية حيّة تحكي القصة، تكشف الأسباب، وتعرض النتائج. تعلّم، استكشف، وتأمّل... كيف صُنعت لحظات غيرت مجرى التاريخ.
        </h3>
        <img src={camels} alt="الجمال" />
      </section>
      <section className="timeline">
        <h2>الخط الزمني</h2>
      </section>
      <section className="map">
        <h2>الخريطة التفاعلية</h2>
      </section>
    </>
  );
}

export default App;