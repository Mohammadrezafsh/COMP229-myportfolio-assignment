import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, signUp } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const navigate = useNavigate();
  const { signInWithToken } = useAuth();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      await signUp(form);
      const signedIn = await signIn({ email: form.email, password: form.password });
      signInWithToken(signedIn.data.token, signedIn.data.user);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="container authWrap">
      <header className="pageHeader">
        <h2>Sign Up</h2>
        <p className="muted">Create an account to manage protected portfolio resources.</p>
      </header>

      <form className="card authCard" onSubmit={handleSubmit}>
        {error ? <div className="errorBox">{error}</div> : null}

        <div className="twoCol">
          <div className="field">
            <label htmlFor="signup-firstname">First Name</label>
            <input
              id="signup-firstname"
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="signup-lastname">Last Name</label>
            <input
              id="signup-lastname"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            name="password"
            minLength={8}
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn primary" type="submit" disabled={saving}>
          {saving ? "Creating account..." : "Create Account"}
        </button>

        <p className="muted authSwitch">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </section>
  );
}
