// Importing necessary libraries and components
import React from "react";
import Footer from "./Components/footer";                   // Footer component shown on all pages
import HomeContent from "./Pages/Homepage.jsx";             // Home page content
import Events from "./Pages/eventspage.jsx";                // Events page
import Story from "./Pages/storypage.jsx";                  // Story detail page (dynamic route)
import Map from "./Components/map.jsx";                     // Map component
import Contact from "./Components/contact.jsx";             // Contact component
import ScrollToTop from "./Components/ScrollToTop";         // Scrolls to top on route change
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router setup

function App() {
  return (
    // Wrapping the entire app in Router to enable routing
    <Router>
      <ScrollToTop /> {/* Ensures the page scrolls to top on route change */}

      {/* Define the routes for the application */}
      <Routes>
        <Route path="/" element={<HomeContent />} />          {/* Home page */}
        <Route path="/events" element={<Events />} />         {/* Events page */}
        <Route path="/map" element={<Map />} />               {/* Interactive map page */}
        <Route path="/contact" element={<Contact />} />       {/* Contact form/page */}
        <Route path="/story/:id" element={<Story />} />       {/* Dynamic story detail page based on story ID */}
      </Routes>

      <Footer /> {/* Footer remains visible across all routes */}
    </Router>
  );
}

export default App; // Export the App component as the default export
