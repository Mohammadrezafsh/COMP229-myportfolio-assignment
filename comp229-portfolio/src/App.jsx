/*
 * File: App.jsx
 * Purpose: Main application component with routing configuration
 * Features: Sets up React Router navigation for all portfolio pages
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

// Main App component - contains layout structure and routing
export default function App() {
  return (
    <div className="appShell">
      <Navbar />

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
