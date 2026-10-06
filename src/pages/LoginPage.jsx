import { useState } from "react";
import { Eyebrow } from "../components/SiteChrome.jsx";
import { demoUsers } from "../data/demoUsers.js";

function LoginPage({ onLogin }) {
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const accepted = onLogin(formData.get("email"), formData.get("password"));
    if (!accepted) {
      setError(
        "Those details don’t match a demo account. Try a test account below.",
      );
      setSubmitted(false);
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="login-page inner-page page-wrap"
    >
      <section className="login-intro">
        <Eyebrow>YOUR LANGUAGE WORKSPACE</Eyebrow>
        <h1>
          Good work starts with <em>understanding.</em>
        </h1>
        <p>
          Sign in to keep your language resources close and return to the
          conversations that matter.
        </p>
        <div className="login-note">
          <span aria-hidden="true">✳</span>
          <p>One thoughtful conversation can change everything.</p>
        </div>
      </section>

      <form
        className="login-form rounded-sm border border-[var(--line)] bg-[var(--surface)] p-7 shadow-sm dark:bg-[#1c2721] sm:p-9"
        onSubmit={handleSubmit}
      >
        <div className="login-form-heading">
          <span>INTERPRĒT / MEMBER ACCESS</span>
          <h2>Welcome back.</h2>
          <p>Enter your details to continue.</p>
        </div>

        <label className="login-field">
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={credentials.email}
            onChange={(event) =>
              setCredentials((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
            required
          />
        </label>
        <label className="login-field">
          <span className="login-password-label">
            Password
            <button
              className="text-xs font-semibold text-[var(--ink-soft)] underline decoration-[var(--coral)] underline-offset-4"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </span>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Your password"
            minLength={8}
            value={credentials.password}
            onChange={(event) =>
              setCredentials((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            required
          />
        </label>
        <label className="login-remember">
          <input type="checkbox" name="remember" />
          <span>Keep me signed in on this device</span>
        </label>
        <button
          className="button button-dark login-submit inline-flex w-full items-center justify-between"
          type="submit"
        >
          Sign in <span aria-hidden="true">↗</span>
        </button>
        {error && (
          <p className="login-status login-error" role="alert">
            {error}
          </p>
        )}
        {submitted && (
          <p className="login-status" role="status">
            Demo sign-in complete. Connect an authentication provider for secure
            account access.
          </p>
        )}
        <p className="login-signup">
          New to the studio? <a href="#register">Create an account ↗</a>
        </p>
        <div className="demo-accounts">
          <span>TEST ACCOUNTS</span>
          {demoUsers.map((user) => (
            <button
              className="demo-account"
              key={user.email}
              type="button"
              aria-label={`Fill sign-in for ${user.name}`}
              onClick={() => {
                setCredentials({ email: user.email, password: user.password });
                setError("");
                setSubmitted(false);
              }}
            >
              <span>
                <strong>{user.name}</strong>
                <small>{user.email}</small>
              </span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </form>
    </main>
  );
}

export default LoginPage;
