import { ArrowLink, Eyebrow, TermCard } from "../components/SiteChrome.jsx";
import { terms } from "../data/glossaryTerms.js";

function ContactBand() {
  return (
    <section className="contact-band">
      <div className="page-wrap contact-band-inner">
        <div>
          <Eyebrow>THE FIRST STEP IS A HELLO</Eyebrow>
          <h2>
            Have a conversation
            <br />
            in mind?
          </h2>
          <p>Tell us what brings you here. We’ll take it from there.</p>
        </div>
        <a
          className="contact-orb"
          href="#contact"
          aria-label="Go to the contact page"
        >
          <span>
            Let’s
            <br />
            talk
          </span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="hero page-wrap">
        <div className="hero-copy">
          <Eyebrow>INTERPRETING, WITH INTENTION</Eyebrow>
          <h1>
            Meaning moves
            <br />
            when <em>we</em> do.
          </h1>
          <p className="hero-intro">
            Clear, considered interpreting for the conversations that matter. We
            help people meet each other, exactly where they are.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#contact">
              Start a conversation <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#glossary">
              Explore the glossary <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span className="note-lines">〰</span>
            <span>
              Language is the beginning
              <br />
              of understanding.
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85"
            alt="People gathered around a table, sharing a conversation"
          />
          <div className="image-caption">
            <span className="caption-mark">↗</span>
            <span>
              Good interpretation
              <br />
              brings us closer.
            </span>
            <small>01 — 03</small>
          </div>
          <div className="hero-stamp" aria-label="Every voice, understood">
            <span>EVERY VOICE</span>
            <span className="stamp-star" aria-hidden="true">
              ✳
            </span>
            <span>UNDERSTOOD</span>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <span>HERE FOR THE HUMAN MOMENT</span>
        <div>
          <span>HEALTHCARE</span>
          <i aria-hidden="true" /> <span>COMMUNITY</span>
          <i aria-hidden="true" /> <span>EDUCATION</span>
          <i aria-hidden="true" /> <span>CONFERENCES</span>
        </div>
      </section>

      <section className="approach-section page-wrap">
        <div className="section-heading">
          <div>
            <Eyebrow>WHAT WE BELIEVE</Eyebrow>
            <h2>
              Not just the words.
              <br />
              <em>Everything around them.</em>
            </h2>
          </div>
          <p>
            Language carries context, trust, and all the things we don’t always
            say out loud. We make room for all of it.
          </p>
        </div>
        <div className="approach-grid">
          <article className="approach-item">
            <span className="approach-index">01 / LISTEN</span>
            <h3>Hear the whole story.</h3>
            <p>
              We start with your people, your setting, and what this
              conversation needs to hold.
            </p>
            <span className="approach-glyph glyph-listen">◖</span>
          </article>
          <article className="approach-item">
            <span className="approach-index">02 / PREPARE</span>
            <h3>Get the details right.</h3>
            <p>
              We match the right interpreter and prepare around the language
              your work actually uses.
            </p>
            <span className="approach-glyph glyph-prepare">✳</span>
          </article>
          <article className="approach-item">
            <span className="approach-index">03 / CONNECT</span>
            <h3>Let meaning through.</h3>
            <p>
              Present, precise interpreting lets everyone take part in the
              moment, not just observe it.
            </p>
            <span className="approach-glyph glyph-connect">↗</span>
          </article>
        </div>
      </section>

      <section className="glossary-preview">
        <div className="page-wrap">
          <div className="section-heading glossary-heading">
            <div>
              <Eyebrow>A FEW WORDS ABOUT WORDS</Eyebrow>
              <h2>
                A shared <em>language.</em>
              </h2>
            </div>
            <ArrowLink href="#glossary">Browse the glossary</ArrowLink>
          </div>
          <div className="preview-grid">
            {terms.slice(0, 3).map((item, index) => (
              <TermCard key={item.term} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}

export default HomePage;
