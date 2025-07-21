import { useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import camels from "../assets/camels.png";
import HomeNavbar from "../Components/homeNavbar";
import Timeline from "../Components/timeline";
import MapView from "../Components/map";
import Contact from "../Components/contact";
import { SlArrowDown } from "react-icons/sl";
import "../CSS/home.css";
import Chatbot from "../Components/chatbot";

function HomePage() {
  const location = useLocation();
  const contactRef = useRef(null);
  const mapRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Check if we have a scroll target in location state
    if (location.state?.scrollTo) {
      const target = location.state.scrollTo;
      setTimeout(() => {
        if (target === 'contact' && contactRef.current) {
          contactRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (target === 'map' && mapRef.current) {
          mapRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (target === 'timeline' && timelineRef.current) {
          timelineRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure page is loaded
    }
  }, [location.state]);

  const handleScroll = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <HomeNavbar />
      <section id="home" className="hero">
        <div className="hero-text" data-aos="fade">
          <h1 dir="rtl" lang="ar">﴿ إِنَّ اللَّهَ يُحِبُّ الَّذينَ يُقاتِلونَ فى سَبيلِهِ صَفًّا كَأَنَّهُم بُنيانٌ مَرصوصٌ ﴾</h1>
          <h5>[الصف: 4 - 4]</h5>
        </div>
        <button className="scroll-down" onClick={handleScroll}>
          <span className="arrow"><SlArrowDown /></span>
        </button>
      </section>

      <div className="flex-container" id="next-section">

        <br /><br /><br /><br /><br /><br />

        <section className="about">
          <h3 className="about-text" data-aos="fade-up" dir="rtl" lang="ar">
            هنا تُروى الغزوات والفتوحات الإسلامية، لا كصفحات في كتاب... بل كتجربة تفاعلية حيّة تحكي القصة، تكشف الأسباب، وتعرض النتائج. تعلّم، استكشف، وتأمّل... كيف صُنعت لحظات غيرت مجرى التاريخ.
          </h3>
          <img src={camels} alt="الجمال" />
        </section>

        <div id="timeline" ref={timelineRef}> </div>

        <section className="timeline" data-aos="fade-up">
          <br /><br />
          <h2 data-aos="fade-up">استعرض أبرز الغزوات والفتوحات، حسب ترتيبها الزمني</h2>
          <Timeline />
        </section>

        <section id="map" className="map" ref={mapRef}>
          <h2>الخريطة التفاعلية</h2>
          <MapView />
        </section>

        <section id="contact" className="contact" ref={contactRef}>
          <Contact />
        </section>
      </div>
    </>
  );
}

export default HomePage;
