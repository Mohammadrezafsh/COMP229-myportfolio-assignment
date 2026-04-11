/*
 * File: Projects.jsx
 * Purpose: Projects page showcasing portfolio work with images and descriptions
 * Features: Displays projects from backend API with images and descriptions
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

import { memo, useEffect, useMemo, useState } from "react";
import { getItems } from "../api/api";

const PROJECT_PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#1f2937" />
        </linearGradient>
      </defs>
      <rect width="1200" height="700" fill="url(#bg)" />
      <circle cx="900" cy="-120" r="320" fill="#0ea5e9" opacity="0.15" />
      <circle cx="220" cy="760" r="260" fill="#8b5cf6" opacity="0.18" />
      <text x="600" y="355" text-anchor="middle" fill="#e2e8f0" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="600">
        Project Preview
      </text>
      <text x="600" y="405" text-anchor="middle" fill="#94a3b8" font-family="Segoe UI, Arial, sans-serif" font-size="24">
        No image uploaded yet
      </text>
    </svg>
  `);

function isUsableImageSource(value) {
  if (!value || typeof value !== "string") return false;
  const trimmed = value.trim();

  return (
    trimmed.startsWith("data:image/") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/")
  );
}

function getProjectImageSource(project) {
  const candidate = project.imageUrl || project.image || "";
  return isUsableImageSource(candidate) ? candidate : PROJECT_PLACEHOLDER_IMAGE;
}

const ProjectCard = memo(function ProjectCard({ project }) {
  return (
    <article className="card projectCard">
      <img
        className="projectImg"
        src={getProjectImageSource(project)}
        alt={project.title}
        loading="lazy"
        decoding="async"
        onError={(event) => {
          event.currentTarget.src = PROJECT_PLACEHOLDER_IMAGE;
        }}
      />
      <div className="projectBody">
        <h3>{project.title}</h3>
        <p className="muted small projectMeta">
          <strong>Completion:</strong> {String(project.completion).slice(0, 10)}
        </p>
        <p>{project.description}</p>
      </div>
    </article>
  );
});

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

  const projectCards = useMemo(
    () => projects.map((project) => <ProjectCard key={project.id} project={project} />),
    [projects]
  );

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
            projectCards
          ) : (
            <div className="card">No projects available yet.</div>
          )}
        </div>
      ) : null}
    </section>
  );
}