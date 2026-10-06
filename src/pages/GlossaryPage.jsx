import { useEffect, useRef, useState } from "react";
import { TermCard, Eyebrow } from "../components/SiteChrome.jsx";
import { terms } from "../data/glossaryTerms.js";

const pageSize = 6;

function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dictionaryLookup, setDictionaryLookup] = useState({
    word: "",
    status: "idle",
    entry: null,
  });
  const resultsRef = useRef(null);
  const normalizedQuery = query.toLowerCase().trim();
  const canLookupWord = /^[\p{L}]+(?:[-'’][\p{L}]+)*$/u.test(normalizedQuery);
  const filteredTerms = terms.filter((item) =>
    `${item.term} ${item.category} ${item.definition} ${item.example} ${item.languages}`
      .toLowerCase()
      .includes(normalizedQuery),
  );
  const pageCount = Math.ceil(filteredTerms.length / pageSize);
  const firstResultIndex = (currentPage - 1) * pageSize;
  const visibleTerms = filteredTerms.slice(
    firstResultIndex,
    firstResultIndex + pageSize,
  );
  const firstPageNumber = Math.max(1, Math.min(currentPage - 2, pageCount - 4));
  const visiblePageNumbers = Array.from(
    { length: Math.min(pageCount, 5) },
    (_, index) => firstPageNumber + index,
  );
  const visibleDictionaryLookup =
    dictionaryLookup.word === normalizedQuery
      ? dictionaryLookup
      : { word: normalizedQuery, status: "loading", entry: null };

  useEffect(() => {
    if (!canLookupWord || normalizedQuery.length < 2) return undefined;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setDictionaryLookup({
        word: normalizedQuery,
        status: "loading",
        entry: null,
      });

      try {
        const response = await fetch(
          `https://api.datamuse.com/words?sp=${encodeURIComponent(normalizedQuery)}&md=d&max=1`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Dictionary lookup failed.");

        const entries = await response.json();
        const exactEntry = entries.find(
          (entry) => entry.word.toLowerCase() === normalizedQuery,
        );
        if (!exactEntry?.defs?.length) {
          setDictionaryLookup({
            word: normalizedQuery,
            status: "not-found",
            entry: null,
          });
          return;
        }
        setDictionaryLookup({
          word: normalizedQuery,
          status: "success",
          entry: exactEntry,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          setDictionaryLookup({
            word: normalizedQuery,
            status: "error",
            entry: null,
          });
        }
      }
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [canLookupWord, normalizedQuery]);

  function goToPage(page) {
    setCurrentPage(page);
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });
  }

  function updateSearch(event) {
    setQuery(event.target.value);
    setCurrentPage(1);
  }

  return (
    <main id="main-content" tabIndex={-1} className="inner-page page-wrap">
      <section className="page-intro">
        <Eyebrow>THE LANGUAGE OF INTERPRETING</Eyebrow>
        <h1>
          Words we <em>share.</em>
        </h1>
        <p>
          A growing field guide to interpreting, one useful phrase at a time.
        </p>
      </section>
      <div className="search-row">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            aria-label="Search glossary"
            placeholder="Search a term, topic, or language…"
            value={query}
            onChange={updateSearch}
          />
        </label>
        <span
          className="result-count"
          aria-live="polite"
          id="glossary-result-count"
        >
          {filteredTerms.length} {filteredTerms.length === 1 ? "TERM" : "TERMS"}
        </span>
      </div>
      {filteredTerms.length ? (
        <div className="glossary-results" ref={resultsRef}>
          <div className="glossary-grid">
            {visibleTerms.map((item, index) => (
              <TermCard
                key={`${item.term}-${firstResultIndex + index}`}
                item={item}
                index={firstResultIndex + index}
              />
            ))}
          </div>
          {pageCount > 1 && (
            <nav className="glossary-pagination" aria-label="Glossary pages">
              <button
                className="pagination-step"
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span aria-hidden="true">←</span> Previous
              </button>
              <div className="pagination-pages">
                {visiblePageNumbers.map((page) => (
                  <button
                    key={page}
                    className={
                      currentPage === page
                        ? "pagination-number is-current"
                        : "pagination-number"
                    }
                    type="button"
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <span className="pagination-range" aria-live="polite">
                {firstResultIndex + 1}–
                {Math.min(firstResultIndex + pageSize, filteredTerms.length)} of{" "}
                {filteredTerms.length}
              </span>
              <button
                className="pagination-step"
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === pageCount}
              >
                Next <span aria-hidden="true">→</span>
              </button>
            </nav>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <span>∅</span>
          <h2>No words found just yet.</h2>
          <p>Try another search or browse a different topic.</p>
          <button
            className="text-link"
            onClick={() => {
              setQuery("");
              setCurrentPage(1);
            }}
          >
            Clear search ↗
          </button>
        </div>
      )}
      {canLookupWord && normalizedQuery.length >= 2 && (
        <section
          className="dictionary-lookup"
          aria-label="Free English dictionary lookup"
          aria-live="polite"
        >
          <div className="dictionary-lookup-label">
            FREE ENGLISH WORD LOOKUP
          </div>
          {visibleDictionaryLookup.status === "loading" && (
            <p className="dictionary-lookup-note">
              Looking up “{normalizedQuery}”…
            </p>
          )}
          {visibleDictionaryLookup.status === "not-found" && (
            <p className="dictionary-lookup-note">
              No external dictionary entry found for “{normalizedQuery}”.
            </p>
          )}
          {visibleDictionaryLookup.status === "error" && (
            <p className="dictionary-lookup-note">
              Dictionary lookup is unavailable right now. Your glossary search
              still works.
            </p>
          )}
          {visibleDictionaryLookup.status === "success" &&
            visibleDictionaryLookup.entry && (
              <article className="dictionary-entry">
                <div className="dictionary-entry-heading">
                  <h2>{visibleDictionaryLookup.entry.word}</h2>
                </div>
                <div className="dictionary-definitions">
                  {visibleDictionaryLookup.entry.defs
                    .slice(0, 4)
                    .map((rawDefinition, index) => {
                      const [partOfSpeech, definition] =
                        rawDefinition.split("\t");
                      return (
                        <div className="dictionary-definition" key={index}>
                          <span>{partOfSpeech}</span>
                          <p>{definition?.trim()}</p>
                        </div>
                      );
                    })}
                </div>
                <p className="dictionary-attribution">
                  Definitions via{" "}
                  <a
                    href="https://www.datamuse.com/api/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Datamuse
                  </a>{" "}
                  (WordNet and Wiktionary sources)
                </p>
              </article>
            )}
        </section>
      )}
      <div className="glossary-footnote">
        <span>01 — A LIVING GLOSSARY</span>
        <p>
          Language keeps moving. Have a term you’d like us to add?{" "}
          <a href="#contact">Send it our way ↗</a>
        </p>
      </div>
    </main>
  );
}

export default GlossaryPage;
