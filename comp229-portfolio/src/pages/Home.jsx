/*
 * File: Home.jsx
 * Purpose: Landing page with welcome message, mission statement, and navigation buttons
 * Features: Hero section with call-to-action buttons to About and Projects pages
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

import { Link, useLocation } from "react-router-dom";

// Home component - main landing page with hero section
export default function Home() {
  const location = useLocation();
  // Display success message from contact form if present
  const message = location.state?.message || "";

  return (
    <section className="container">
      <div className="hero">
        <div className="heroLeft">
          <p className="pill">Welcome</p>
          <h1 className="heroTitle">
            Building responsive web solutions with <span className="accent">3 years</span> of experience.
          </h1>

          <p className="heroSub">
            Mission: Combining professional WordPress development expertise with modern full-stack skills 
            to create user-focused, responsive applications. Passionate about clean code, intuitive design, 
            and continuous learning in AI and software engineering.
          </p>

          {message ? <div className="notice">{message}</div> : null}

          <div className="heroActions">
            <Link className="btn primary" to="/about">
              Learn more about me
            </Link>
            <Link className="btn ghost" to="/projects">
              View projects
            </Link>
          </div>
        </div>

        <div className="heroRight">
          <div className="statCard">
            <p className="statLabel">Experience</p>
            <p className="statValue">3 years professional web dev</p>
          </div>
          <div className="statCard">
            <p className="statLabel">Focus</p>
            <p className="statValue">Full-Stack & AI Development</p>
          </div>
          <div className="statCard">
            <p className="statLabel">TECH STACK</p>
            <p className="statValue">React • Node • Flask • SQL • WordPress</p>
          </div>
        </div>
      </div>
    </section>
  );
}
