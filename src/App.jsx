import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Homepage";
import Dashboard from "./components/Tracker";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      {/* Not working with theme toggle - need to be fixed */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
