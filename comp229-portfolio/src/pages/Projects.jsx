/*
 * File: Projects.jsx
 * Purpose: Projects page showcasing portfolio work with images and descriptions
 * Features: Displays projects from backend API with images and descriptions
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

import { useEffect, useState } from "react";
import p1 from "../assets/project1.jpg";
import p2 from "../assets/project2.jpg";
import p3 from "../assets/project3.jpg";
import { getItems } from "../api/api";

const fallbackImages = [p1, p2, p3];

// Projects component - renders project data from backend
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const result = await getItems("projects");
        setProjects(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <section className="container">
      <header className="pageHeader">
        <h2>Projects</h2>
        <p className="muted">
          Featured work demonstrating full-stack and front-end development skills.
        </p>
      </header>

      {loading ? <div className="card">Loading projects...</div> : null}
      {error ? <div className="errorBox">{error}</div> : null}

      {!loading && !error ? (
        <div className="grid3">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <article key={project.id} className="card projectCard">
                <img
                  className="projectImg"
                  src={fallbackImages[index % fallbackImages.length]}
                  alt={project.title}
                />
                <div className="projectBody">
                  <h3>{project.title}</h3>
                  <p className="muted small" style={{ marginBottom: "8px" }}>
                    <strong>Completion:</strong> {String(project.completion).slice(0, 10)}
                  </p>
                  <p>{project.description}</p>
                </div>
              </article>
            ))
          ) : (
            <div className="card">No projects available yet.</div>
          )}
        </div>
      ) : null}
    </section>
  );
}