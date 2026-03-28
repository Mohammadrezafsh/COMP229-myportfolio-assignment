/*
 * File: Services.jsx
 * Purpose: Services page listing offered services with images
 * Features: Displays services grid from backend API
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

import { useEffect, useState } from "react";
import { getItems } from "../api/api";

const SERVICE_PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#111827" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="1200" height="700" fill="url(#bg)" />
      <circle cx="1030" cy="-70" r="280" fill="#22d3ee" opacity="0.18" />
      <circle cx="140" cy="760" r="240" fill="#8b5cf6" opacity="0.2" />
      <text x="600" y="350" text-anchor="middle" fill="#e2e8f0" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="600">
        Service Preview
      </text>
      <text x="600" y="402" text-anchor="middle" fill="#94a3b8" font-family="Segoe UI, Arial, sans-serif" font-size="24">
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

// Services component - renders services from backend
export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        const result = await getItems("services");
        setServices(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <section className="container">
      <header className="pageHeader">
        <h2>Services</h2>
        <p className="muted">
          Professional services backed by experience and ongoing academic training.
        </p>
      </header>

      {loading ? <div className="card">Loading services...</div> : null}
      {error ? <div className="errorBox">{error}</div> : null}

      {!loading && !error ? (
        <div className="grid3">
          {services.length > 0 ? (
            services.map((service) => (
              <article key={service.id} className="card serviceCard">
                <img
                  className="serviceImg"
                  src={
                    isUsableImageSource(service.imageUrl || service.image)
                      ? service.imageUrl || service.image
                      : SERVICE_PLACEHOLDER_IMAGE
                  }
                  alt={service.title}
                  onError={(event) => {
                    event.currentTarget.src = SERVICE_PLACEHOLDER_IMAGE;
                  }}
                />
                <div className="serviceBody">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))
          ) : (
            <div className="card">No services available yet.</div>
          )}
        </div>
      ) : null}
    </section>
  );
}