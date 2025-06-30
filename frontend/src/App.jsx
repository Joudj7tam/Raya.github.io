import HomeContent from "./Pages/Homepage.jsx";
import Story from "./Pages/story.jsx";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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