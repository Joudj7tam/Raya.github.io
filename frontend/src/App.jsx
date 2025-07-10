import React from "react";
import Footer from "./Components/footer";
import HomeContent from "./Pages/Homepage.jsx";
import Events from "./Pages/eventspage.jsx"
import Story from "./Pages/storypage.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/events" element={<Events />} />
        <Route path="/story/:id" element={<Story />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;