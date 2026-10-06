import { useRef, useState } from "react";

export function Header({ page, theme, userName, onSignOut, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);

  function handleHeaderKeyDown(event) {
    if (event.key === "Escape" && menuOpen) {
      closeMenu();
      menuToggleRef.current?.focus();
    }
  }

  return (
    <header className="site-header" onKeyDown={handleHeaderKeyDown}>
      <a className="wordmark" href="#home" aria-label="Interprēt home">
        <span className="wordmark-symbol">
          i<span>.</span>
        </span>
        <span>
          interprēt<span className="wordmark-small"> LANGUAGE STUDIO</span>
        </span>
      </a>
      {userName && (
        <div className="header-user top-user">
          <span className="user-avatar" aria-hidden="true">
            {userName.charAt(0).toUpperCase()}
          </span>
          <span className="user-label">
            <small>Signed in as</small>
            <strong>{userName}</strong>
          </span>
          <button className="user-signout" type="button" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      )}
      <div className="header-controls">
        <button
          ref={menuToggleRef}
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <button
          className="theme-toggle inline-flex h-9 w-9 items-center justify-center border border-[var(--line)] bg-[var(--paper-deep)] text-base text-[var(--ink)] transition-colors hover:bg-[var(--line)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--coral)] dark:bg-[#26332c] dark:text-[#e8eee6] dark:hover:bg-[#34443a]"
          type="button"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          aria-pressed={theme === "dark"}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          onClick={onToggleTheme}
        >
          <span aria-hidden="true">{theme === "dark" ? "☼" : "☾"}</span>
        </button>
      </div>
      <nav
        id="site-navigation"
        className={`main-nav ${menuOpen ? "is-open" : ""}`}
        aria-label="Main navigation"
      >
        {userName && (
          <div className="menu-user">
            <span>Signed in as</span>
            <strong>{userName}</strong>
            <button
              className="user-signout"
              type="button"
              onClick={() => {
                onSignOut();
                closeMenu();
              }}
            >
              Sign out
            </button>
          </div>
        )}
        <a
          className={page === "home" ? "active" : ""}
          href="#home"
          aria-current={page === "home" ? "page" : undefined}
          onClick={closeMenu}
        >
          Home
        </a>
        <a
          className={page === "glossary" ? "active" : ""}
          href="#glossary"
          aria-current={page === "glossary" ? "page" : undefined}
          onClick={closeMenu}
        >
          Glossary
        </a>
        <a
          className={page === "chat" ? "active" : ""}
          href="#chat"
          aria-current={page === "chat" ? "page" : undefined}
          onClick={closeMenu}
        >
          Language desk
        </a>
        <a
          className={page === "login" ? "active" : ""}
          href="#login"
          aria-current={page === "login" ? "page" : undefined}
          onClick={closeMenu}
        >
          Sign in
        </a>
        <a
          className="nav-contact"
          href="#contact"
          aria-current={page === "contact" ? "page" : undefined}
          onClick={closeMenu}
        >
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}

export function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-dot" />
      {children}
    </div>
  );
}

export function ArrowLink({ href, children }) {
  return (
    <a className="arrow-link" href={href}>
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export function TermCard({ item, index }) {
  return (
    <article className={`term-card term-card-${index % 3}`}>
      <div className="term-card-top">
        <span>{item.category}</span>
        <span className="term-language">{item.languages}</span>
      </div>
      <h3>{item.term}</h3>
      <p>{item.definition}</p>
      <div className="term-example">
        <span>IN PRACTICE</span>
        {item.example}
      </div>
    </article>
  );
}

export function Footer() {
  return (
    <footer className="site-footer page-wrap">
      <a className="footer-mark" href="#home">
        interprēt<span>®</span>
      </a>
      <span>Interpretation is a way of being together.</span>
      <nav aria-label="Footer navigation">
        <a href="#glossary">Glossary</a>
        <a href="#chat">Language desk</a>
        <a href="#contact">Contact ↗</a>
        <a href="#login">Sign in</a>
        <a href="#register">Register</a>
      </nav>
      <small>© 2026 INTERPRĒT LANGUAGE STUDIO</small>
    </footer>
  );
}
