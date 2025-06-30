import React from "react";
import hero from "./assets/hero.png";
import camels from "./assets/camels.png";
import HomeNavbar from "./Components/homeNavbar";
import { Footer } from "./Components/footer";
import HomeContent from "./Pages/Homepage.jsx";
import Story from "./Pages/storypage.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/story" element={<Story />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;