import logo from "../assets/whiteLogo.png";
import lang from "../assets/language.svg";

function HomeNavbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="الشعار" />
      <a href="#"><img src={lang} alt="اللغة" /> English</a>
      <a href="#">الرئيسة</a>
      <a href="#">الأحداث</a>
      <a href="#">الخريطة التفاعلية</a>
      <a href="#">تواصل معنا</a>
    </nav>
  );
}

export default HomeNavbar;
