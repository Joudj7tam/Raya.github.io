import camels from "../assets/camels.png";
import HomeNavbar from "../Components/homeNavbar";
import Timeline from "../Components/timeline";
import "../CSS/home.css";

function HomePage() {
  return (
    <>
      <HomeNavbar />
      <section className="hero">
        <div className="hero-text">
          <h1 dir="rtl" lang="ar">﴿ إِنَّ اللَّهَ يُحِبُّ الَّذينَ يُقاتِلونَ فى سَبيلِهِ صَفًّا كَأَنَّهُم بُنيانٌ مَرصوصٌ ﴾</h1>
          <h5>[الصف: 4 - 4]</h5>
        </div>
      </section>

      <div className="flex-container">
        <section className="about">
          <h3 className="about-text" dir="rtl" lang="ar">
            هنا تُروى الغزوات والفتوحات الإسلامية، لا كصفحات في كتاب... بل كتجربة تفاعلية حيّة تحكي القصة، تكشف الأسباب، وتعرض النتائج. تعلّم، استكشف، وتأمّل... كيف صُنعت لحظات غيرت مجرى التاريخ.
          </h3>
          <img src={camels} alt="الجمال" />
        </section>
        <section className="timeline">
          <h2>الخط الزمني</h2>
          <Timeline />
        </section>
        <section className="map">
          <h2>الخريطة التفاعلية</h2>
        </section>
      </div>
    </>
  );
}

export default HomePage;
