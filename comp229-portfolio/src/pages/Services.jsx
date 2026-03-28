/*
 * File: Services.jsx
 * Purpose: Services page listing offered services with images
 * Features: Displays services grid from backend API
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

import { useEffect, useState } from "react";
import s1 from "../assets/service1.jpg";
import s2 from "../assets/service2.jpg";
import s3 from "../assets/service3.jpg";
import { getItems } from "../api/api";

const fallbackImages = [s1, s2, s3];

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
            services.map((service, index) => (
              <article key={service.id} className="card serviceCard">
                <img
                  className="serviceImg"
                  src={fallbackImages[index % fallbackImages.length]}
                  alt={service.title}
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