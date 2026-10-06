import { useState } from "react";
import { Eyebrow } from "../components/SiteChrome.jsx";

function RegisterPage({ onRegister }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      setError("Those passwords don’t match yet.");
      setSubmitted(false);
      return;
    }
    setError("");
    onRegister(formData.get("name"), formData.get("email"));
    setSubmitted(true);
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="login-page inner-page page-wrap"
    >
      <section className="login-intro">
        <Eyebrow>A SPACE FOR BETTER CONVERSATIONS</Eyebrow>
        <h1>
          Find your place in the <em>conversation.</em>
        </h1>
        <p>
          Create a studio account to keep your interpreting resources and
          language notes together.
        </p>
        <div className="login-note">
          <span aria-hidden="true">✳</span>
          <p>Every voice deserves room to be understood.</p>
        </div>
      </section>

      <form
        className="login-form rounded-sm border border-[var(--line)] bg-[var(--surface)] p-7 shadow-sm dark:bg-[#1c2721] sm:p-9"
        onSubmit={handleSubmit}
      >
        <div className="login-form-heading">
          <span>INTERPRĒT / NEW MEMBER</span>
          <h2>Create your account.</h2>
          <p>Start with the details below.</p>
        </div>

        <label className="login-field">
          Your name
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="What should we call you?"
            required
          />
        </label>
        <label className="login-field">
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="login-field">
          Password
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            minLength={8}
            required
          />
        </label>
        <label className="login-field">
          <span className="login-password-label">
            Confirm password
            <button
              className="text-xs font-semibold text-[var(--ink-soft)] underline decoration-[var(--coral)] underline-offset-4"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide passwords" : "Show passwords"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </span>
          <input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Enter your password again"
            minLength={8}
            required
          />
        </label>
        {error && (
          <p className="login-status login-error" role="alert">
            {error}
          </p>
        )}
        {submitted && (
          <p className="login-status" role="status">
            Demo profile created on this device. Connect an authentication
            provider to create a secure account.
          </p>
        )}
        <button
          className="button button-dark login-submit inline-flex w-full items-center justify-between"
          type="submit"
        >
          Create account <span aria-hidden="true">↗</span>
        </button>
        <p className="login-signup">
          Already have an account? <a href="#login">Sign in ↗</a>
        </p>
      </form>
    </main>
  );
}

export default RegisterPage;
