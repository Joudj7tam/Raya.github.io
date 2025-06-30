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

export default App;