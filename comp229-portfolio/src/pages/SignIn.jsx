import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signIn } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithToken } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fromPath = location.state?.from || "/dashboard";

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const result = await signIn(form);
      signInWithToken(result.data.token, result.data.user);
      navigate(fromPath, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="container authWrap">
      <header className="pageHeader">
        <h2>Sign In</h2>
        <p className="muted">Access your protected dashboard and CRUD actions.</p>
      </header>

      <form className="card authCard" onSubmit={handleSubmit}>
        {error ? <div className="errorBox">{error}</div> : null}

        <div className="field">
          <label htmlFor="signin-email">Email</label>
          <input
            id="signin-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="signin-password">Password</label>
          <input
            id="signin-password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn primary" type="submit" disabled={saving}>
          {saving ? "Signing in..." : "Sign In"}
        </button>

        <p className="muted authSwitch">
          Need an account? <Link to="/signup">Create one</Link>
        </p>
      </form>
    </section>
  );
}
