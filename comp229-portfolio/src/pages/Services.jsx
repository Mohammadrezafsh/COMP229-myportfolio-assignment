/*
 * File: Services.jsx
 * Purpose: Services page listing offered services with images
 * Features: Displays services grid with images and descriptions
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

import s1 from "../assets/service1.jpg";
import s2 from "../assets/service2.jpg";
import s3 from "../assets/service3.jpg";

// Services data array - contains title, image, and description for each service
const services = [
  {
    title: "WordPress & Web Development",
    image: s1,
    desc: "Responsive website development using WordPress, Elementor, HTML, and CSS. Experienced in theme customization, mobile responsiveness, and cross-browser compatibility with 3 years of professional experience.",
  },
  {
    title: "Full-Stack Application Development",
    image: s2,
    desc: "Building web applications using Python (Flask), JavaScript, C#, and SQL databases. Proficient in Agile/Scrum methodology, object-oriented programming, and implementing user authentication and CRUD operations.",
  },
  {
    title: "Database Design & SQL Development",
    image: s3,
    desc: "Relational database design using Oracle SQL with ER modeling, normalization, and complex queries. Experience with DDL/DML operations, joins, aggregate functions, and optimizing database performance.",
  },
];

// Services component - renders services grid with cards
export default function Services() {
  return (
    <section className="container">
      <header className="pageHeader">
        <h2>Services</h2>
        <p className="muted">Professional services backed by 3 years of experience and ongoing academic training.</p>
      </header>

      <div className="grid3">
        {services.map((s) => (
          <article key={s.title} className="card serviceCard">
            <img className="serviceImg" src={s.image} alt={s.title} />
            <div className="serviceBody">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
