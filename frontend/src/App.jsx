<<<<<<< HEAD
import React from "react";
import hero from "./assets/hero.png";
import camels from "./assets/camels.png";
import HomeNavbar from "./Components/homeNavbar";
import { Navbar } from "./Components/navbar";
import { Footer } from "./Components/footer";
=======
import HomeContent from "./Pages/Homepage.jsx";
import Story from "./Pages/story.jsx";
>>>>>>> 02177c5bf257fd6f7dfd4bdbae6fe8af09611b3c

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
<<<<<<< HEAD
    <>
    <Navbar />
    <Footer />
    </>
=======
    <Router>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </Router>
>>>>>>> 02177c5bf257fd6f7dfd4bdbae6fe8af09611b3c
  );
}

export default App;