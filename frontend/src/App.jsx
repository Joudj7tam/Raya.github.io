import React from "react";
import Footer from "./Components/footer";
import HomeContent from "./Pages/Homepage.jsx";
import Events from "./Pages/eventspage.jsx"
import Story from "./Pages/storypage.jsx";
import Map from "./Components/map.jsx"
import Contact from "./Components/contact.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/events" element={<Events />} />
        <Route path="/map" element={<Map />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/story/:id" element={<Story />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;