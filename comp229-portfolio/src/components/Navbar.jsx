/*
 * File: Navbar.jsx
 * Purpose: Navigation bar component with logo and page links
 * Features: Sticky header with custom logo and responsive navigation to all pages
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

import { NavLink } from "react-router-dom";
import logo from "../assets/logo.ico";

// Navbar component - main navigation with logo and links to all pages
export default function Navbar() {
  return (
    <header className="navWrap">
      <div className="navInner">
        <NavLink to="/" className="brand" aria-label="Go to Home">
          <img className="brandLogo" src={logo} alt="Personal logo" />
          <div className="brandText">
            <span className="brandName">Mohammad Reza Faghih Shojaei</span>
            <span className="brandTag">React - Node - Web Apps</span>
          </div>
        </NavLink>

        <nav className="navLinks" aria-label="Primary">
          <NavLink to="/" className={({ isActive }) => (isActive ? "link active" : "link")}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "link active" : "link")}>
            About
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Projects
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
