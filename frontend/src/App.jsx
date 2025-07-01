import React from "react";
import Footer from "./Components/footer";
import HomeContent from "./Pages/Homepage.jsx";
import Events from "./Pages/eventspage.jsx"
import Story from "./Pages/storypage.jsx";
import Details from "./Pages/detailspage.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/events" element={<Events />} />
        <Route path="/story" element={<Story />} />
        <Route path="/details" element={<Details />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;