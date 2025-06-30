import React from "react";
import hero from "./assets/hero.png";
import camels from "./assets/camels.png";
import HomeNavbar from "./Components/homeNavbar";
import "../CSS/home.css";

function HomePage() {
  return (
    <>
    <HomeNavbar />
      <section className="hero">
        <img src={hero} alt="hero" className="w-full h-auto object-cover"/>
        <h1>إِنَّ اللَّهَ يُحِبُّ الَّذينَ يُقاتِلونَ فى سَبيلِهِ صَفًّا كَأَنَّهُم بُنيانٌ مَرصوصٌ</h1>
        <h5>[الصف: 4 - 4]</h5>
      </section>
      <section className="about">
        <h3 className="text">
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

export default HompePage;
