/*
 * File: Contact.jsx
 * Purpose: Contact page with contact information panel and interactive form
 * Features: Captures reference data and stores it in the backend database
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../api/api";

// Contact component - displays contact info and handles form submission to backend
export default function Contact() {
  const navigate = useNavigate();

  // Form state management - stores all user input fields
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
    company: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes and update form state
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle form submission - sends data to backend and redirects to Home page
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await createItem("references", form);

      navigate("/", {
        state: { message: "Thank you. Your reference entry was saved successfully." },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="container">
      <header className="pageHeader">
        <h2>Contact</h2>
        <p className="muted">Get in touch with me.</p>
      </header>

      <div className="contactGrid">
        <aside className="card contactPanel">
          <h3>Contact Info</h3>
          <div className="contactLine">
            <span className="label">Email</span>
            <span>mfaghis@centennialcollege.ca</span>
          </div>
          <div className="contactLine">
            <span className="label">Phone</span>
            <span>(204) 869-6391</span>
          </div>
          <div className="contactLine">
            <span className="label">Location</span>
            <span>Toronto / GTA, ON</span>
          </div>
        </aside>

        <form className="card formCard" onSubmit={handleSubmit}>
          {error ? <div className="errorBox">{error}</div> : null}

          <div className="twoCol">
            <div className="field">
              <label htmlFor="firstname">First Name</label>
              <input
                id="firstname"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="lastname">Last Name</label>
              <input
                id="lastname"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="twoCol">
            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="position">Position</label>
              <input
                id="position"
                name="position"
                value={form.position}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Send Reference"}
          </button>
        </form>
      </div>
    </section>
  );
}