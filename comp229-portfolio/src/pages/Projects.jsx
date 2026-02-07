/*
 * File: Projects.jsx
 * Purpose: Projects page showcasing portfolio work with images and descriptions
 * Features: Displays 3+ projects with images, roles, and outcomes
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

import p1 from "../assets/project1.jpg";
import p2 from "../assets/project2.jpg";
import p3 from "../assets/project3.jpg";

// Project data array - contains title, image, role, description, technologies, and outcome
const projects = [
  {
    title: "Soccer Store - E-Commerce Platform",
    image: p1,
    role: "Full-Stack Developer",
    description:
      "Developed a complete e-commerce platform for sports equipment using Flask and Python. Features multi-tier user authentication with three distinct roles (customer, manager, admin), shopping cart functionality for authenticated and guest users, product catalog with CRUD operations, order processing system with purchase history, manager dashboard with sales analytics, and admin panel for user management.",
    technologies: "Python, Flask, SQLAlchemy, Flask-Login, SQLite, HTML/CSS, Jinja2",
    outcome:
      "Delivered a fully functional web application demonstrating proficiency in full-stack development, database design, user authentication, and role-based authorization. Successfully handles the complete e-commerce workflow from product browsing to order completion.",
  },
  {
    title: "Interactive Slideshow & Photo Gallery",
    image: p2,
    role: "Front-End Developer",
    description:
      "Designed and implemented an interactive slideshow with photo gallery using HTML, CSS, and JavaScript. Structured semantic markup, authored layout and visual styling including lightbox functionality, and wired interactive behaviors for smooth user experience. Features forward/backward navigation, play/pause controls, full-screen mode, and favorites system.",
    technologies: "HTML5, CSS3, JavaScript, DOM Manipulation",
    outcome:
      "Delivered a cohesive single-page site with consistent typography, spacing, and color treatment, plus interactive UI behaviors that improve usability. The final result is a polished, responsive page demonstrating core front-end skills suitable for portfolio showcase.",
  },
  {
    title: "Ember & Oak Roastery Website",
    image: p3,
    role: "Front-End Developer",
    description:
      "Designed and developed a multi-page responsive website for a specialty coffee roaster featuring home page, product catalog, individual product detail pages, and contact form. Implemented semantic HTML5 structure with consistent navigation, image optimization, and user-friendly layout. Showcases three coffee roast profiles with detailed specifications, customer testimonials, and comprehensive contact information.",
    technologies: "HTML5, CSS3, Responsive Web Design",
    outcome:
      "Delivered a fully functional 7-page website with clean navigation structure, form validation, and mobile-responsive design. Demonstrates proficiency in HTML5, CSS3, semantic markup, and web accessibility standards.",
  },
];

// Projects component - renders project grid with cards
export default function Projects() {
  return (
    <section className="container">
      <header className="pageHeader">
        <h2>Projects</h2>
        <p className="muted">Featured work demonstrating full-stack and front-end development skills.</p>
      </header>

      <div className="grid3">
        {projects.map((p) => (
          <article key={p.title} className="card projectCard">
            <img className="projectImg" src={p.image} alt={p.title} />
            <div className="projectBody">
              <h3>{p.title}</h3>
              <p className="muted small" style={{ marginBottom: '8px' }}>
                <strong>Role:</strong> {p.role}
              </p>
              <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>{p.description}</p>
              <p className="muted small" style={{ marginBottom: '8px' }}>
                <strong>Technologies:</strong> {p.technologies}
              </p>
              <p className="small">{p.outcome}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
