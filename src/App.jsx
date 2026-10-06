import { useEffect, useRef, useState } from "react";
import { Footer, Header } from "./components/SiteChrome.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import GlossaryPage from "./pages/GlossaryPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { demoUsers } from "./data/demoUsers.js";

const pages = {
  home: HomePage,
  glossary: GlossaryPage,
  chat: ChatPage,
  contact: ContactPage,
  login: LoginPage,
  register: RegisterPage,
};

const pageTitles = {
  home: "Home",
  glossary: "Glossary",
  chat: "Language Desk",
  contact: "Contact",
  login: "Sign In",
  register: "Create Account",
};

function App() {
  const [page, setPage] = useState(
    () => window.location.hash.slice(1) || "home",
  );
  const previousPage = useRef(page);
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("interpreter-theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [userName, setUserName] = useState(
    () => window.localStorage.getItem("interpreter-user-name") || "",
  );

  useEffect(() => {
    function syncRoute() {
      const route = window.location.hash.slice(1) || "home";
      setPage(route in pages ? route : "home");
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
        ? "auto"
        : "smooth";
      window.scrollTo({ top: 0, behavior });
    }

    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  useEffect(() => {
    document.title = `${pageTitles[page] ?? pageTitles.home} | Interprēt Language Studio`;
    if (previousPage.current === page) return undefined;
    previousPage.current = page;
    const focusFrame = window.requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(focusFrame);
  }, [page]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("interpreter-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#151d19" : "#f8f8f2");
  }, [theme]);

  function handleLogin(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const demoUser = demoUsers.find((user) => user.email === normalizedEmail);
    let displayName = demoUser?.name;

    if (demoUser && demoUser.password !== password) return false;

    if (!demoUser) {
      try {
        const profile = JSON.parse(
          window.localStorage.getItem("interpreter-demo-profile") || "null",
        );
        if (
          profile?.email?.toLowerCase() === normalizedEmail &&
          typeof profile.name === "string" &&
          password.length >= 8
        ) {
          displayName = profile.name;
        }
      } catch {
        window.localStorage.removeItem("interpreter-demo-profile");
      }
    }

    if (!displayName) return false;

    setUserName(displayName);
    window.localStorage.setItem("interpreter-user-name", displayName);
    return true;
  }

  function handleRegister(name, email) {
    const profile = { name: name.trim(), email: email.trim().toLowerCase() };
    setUserName(profile.name);
    window.localStorage.setItem("interpreter-user-name", profile.name);
    window.localStorage.setItem(
      "interpreter-demo-profile",
      JSON.stringify(profile),
    );
  }

  function handleSignOut() {
    setUserName("");
    window.localStorage.removeItem("interpreter-user-name");
  }

  const CurrentPage = pages[page] ?? HomePage;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header
        page={page}
        theme={theme}
        userName={userName}
        onSignOut={handleSignOut}
        onToggleTheme={() =>
          setTheme((current) => (current === "dark" ? "light" : "dark"))
        }
      />
      <CurrentPage onLogin={handleLogin} onRegister={handleRegister} />
      <Footer />
    </>
  );
}

export default App;
