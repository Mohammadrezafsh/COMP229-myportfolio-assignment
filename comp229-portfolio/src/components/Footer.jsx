/*
 * File: Footer.jsx
 * Purpose: Footer component with copyright and course information
 * Features: Displays dynamic year and attribution
 * Author: Mohammad Reza Faghih Shojaei
 * Date: February 2026
 */

// Footer component - displays copyright and course info
export default function Footer() {
  // Get current year dynamically for copyright
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footerInner">
        <p>© {year} Mohammad Reza Faghih Shojaei - Built with React</p>
        <p className="muted">COMP229 Portfolio Assignment</p>
      </div>
    </footer>
  );
}
