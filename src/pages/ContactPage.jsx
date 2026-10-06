import { useState } from "react";
import { Eyebrow } from "../components/SiteChrome.jsx";

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function submitContact(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="inner-page page-wrap contact-page"
    >
      <div className="contact-layout">
        <section className="contact-copy">
          <Eyebrow>LET’S BEGIN SOMEWHERE</Eyebrow>
          <h1>
            Tell us what
            <br />
            you’re <em>working on.</em>
          </h1>
          <p>
            One conversation can change the shape of a whole room. Tell us about
            yours and we’ll be in touch within two working days.
          </p>
          <div className="contact-detail">
            <span>FOR THE GENERAL HELLO</span>
            <a href="mailto:hello@interpret.studio">hello@interpret.studio ↗</a>
          </div>
          <div className="contact-detail">
            <span>OUR WORKING HOURS</span>
            <p>
              Monday – Friday
              <br />
              9:00 am – 5:00 pm
            </p>
          </div>
        </section>
        <form className="contact-form" onSubmit={submitContact}>
          <div className="form-top">
            <span>01 / YOUR NOTE</span>
            <span>ALL FIELDS REQUIRED</span>
          </div>
          {submitted ? (
            <div className="form-success" role="status">
              <span>✳</span>
              <h2>Your note is with us.</h2>
              <p>
                Thank you for getting in touch. We’ll be back in the
                conversation soon.
              </p>
              <button
                className="text-link"
                type="button"
                onClick={() => setSubmitted(false)}
              >
                Send another note ↗
              </button>
            </div>
          ) : (
            <>
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  autoCapitalize="words"
                  placeholder="What should we call you?"
                  required
                />
              </label>
              <label>
                Your email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                What brings you here?
                <select name="reason" defaultValue="" required>
                  <option value="" disabled>
                    Choose a starting point
                  </option>
                  <option>Book an interpreter</option>
                  <option>Ask about a project</option>
                  <option>Suggest a glossary term</option>
                  <option>Something else</option>
                </select>
              </label>
              <label>
                A little more about it
                <textarea
                  name="message"
                  rows="4"
                  placeholder="A few details help us get started…"
                  required
                />
              </label>
              <button
                className="button button-dark submit-button"
                type="submit"
              >
                Send your note <span aria-hidden="true">↗</span>
              </button>
            </>
          )}
        </form>
      </div>
    </main>
  );
}

export default ContactPage;
