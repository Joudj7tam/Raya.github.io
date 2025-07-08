import React, { useEffect , useRef} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import camels from "../assets/camels.png";
import HomeNavbar from "../Components/homeNavbar";
import Timeline from "../Components/timeline";
import MapView from "../Components/map";
import "../CSS/home.css";

function HomePage() {
  useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

  return (
    <>
      <HomeNavbar />
      <section id="home" className="hero">
        <div className="hero-text" data-aos="fade">
          <h1 dir="rtl" lang="ar">﴿ إِنَّ اللَّهَ يُحِبُّ الَّذينَ يُقاتِلونَ فى سَبيلِهِ صَفًّا كَأَنَّهُم بُنيانٌ مَرصوصٌ ﴾</h1>
          <h5>[الصف: 4 - 4]</h5>
        </div>
      </section>

      <div className="flex-container">

        <section className="about">
          <h3 className="about-text" data-aos="fade-up" dir="rtl" lang="ar">
            هنا تُروى الغزوات والفتوحات الإسلامية، لا كصفحات في كتاب... بل كتجربة تفاعلية حيّة تحكي القصة، تكشف الأسباب، وتعرض النتائج. تعلّم، استكشف، وتأمّل... كيف صُنعت لحظات غيرت مجرى التاريخ.
          </h3>
          <img src={camels} alt="الجمال" />
        </section>

        <section className="timeline" data-aos="fade-up">
          <h2 data-aos="fade-up">استعرض أبرز الغزوات والفتوحات، حسب ترتيبها الزمني</h2>
          <Timeline />
        </section>

        <section id="map" className="map">
          <h2>الخريطة التفاعلية</h2>
          <MapView />
        </section>

        <section id="contact" className="contact">
          <h2>تواصل معنا </h2>
        </section>
      </div>
    </>
  );
}

export default HomePage;
