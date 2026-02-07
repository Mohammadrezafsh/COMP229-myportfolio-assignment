/*
 * File: About.jsx
 * Purpose: About Me page with profile information, photo, and resume link
 * Features: Displays legal name, profile image, bio paragraph, skills, and PDF resume download
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

import profileImg from "../assets/profile.jpg";

// About component - displays professional profile and skills
export default function About() {
  return (
    <section className="container">
      <header className="pageHeader">
        <h2>About Me</h2>
        <p className="muted">Software Engineering Student & Web Developer</p>
      </header>

      <div className="aboutGrid">
        <div className="card aboutCard">
          <img className="profileImg" src={profileImg} alt="Head and shoulder profile" />
          <div className="aboutInfo">
            <h3>Mohammad Reza Faghih Shojaei</h3>
            <p className="muted">
              Junior Software Developer - Software Engineering Technology - AI - Centennial College
            </p>

            <p>
              I'm a highly motivated software engineering student with 3 years of professional web development experience. 
              I specialize in building responsive, user-focused websites using WordPress, HTML, CSS, and modern frameworks. 
              Currently expanding my expertise in full-stack development, artificial intelligence, and database design.
            </p>

            <a className="btn primary" href="/resume.pdf" target="_blank" rel="noreferrer" style={{ marginTop: '20px' }}>
              View Resume (PDF)
            </a>
          </div>
        </div>

        <div className="card">
          <h3>Skills Snapshot</h3>
          <ul className="list">
            <li>WordPress & Elementor (3 years professional experience)</li>
            <li>HTML/CSS & Responsive Web Design</li>
            <li>Python (Flask), C#, JavaScript</li>
            <li>Oracle SQL & Database Design</li>
            <li>Object-Oriented Programming & Data Structures</li>
            <li>Agile/Scrum Methodology & Jira</li>
            <li>Linux/UNIX Systems & Server Administration</li>
            <li>React & Modern Front-End Development</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
