/*
 * File: Contact.jsx
 * Purpose: Contact page with contact information panel and interactive message form
 * Features: Captures user input (First Name, Last Name, Email, Phone, Message) and redirects to Home
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Contact component - displays contact info and handles form submission
export default function Contact() {
  const navigate = useNavigate();

  // Form state management - stores all user input fields
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  // Handle input changes and update form state
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle form submission - captures data and redirects to Home page
  function handleSubmit(e) {
    e.preventDefault();

    // Capture form data
    sessionStorage.setItem("contactForm", JSON.stringify(form));

    // Redirect to Home page with success message
    navigate("/", {
      state: { message: "Thank you for your message! I'll get back to you soon." },
    });
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
          <div className="twoCol">
            <div className="field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="twoCol">
            <div className="field">
              <label htmlFor="phone">Contact Number</label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

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
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn primary" type="submit">
            Send Message
          </button>

        </form>
      </div>
    </section>
  );
}
