import { useState } from "react";
import { Eyebrow } from "../components/SiteChrome.jsx";
import { terms } from "../data/glossaryTerms.js";

const initialMessages = [
  {
    from: "guide",
    text: "Hi, I’m your language desk. Ask me about interpreting, or search this conversation to find a message.",
  },
];

function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.toLowerCase().trim();
  const visibleMessages = messages.filter((message) =>
    message.text.toLowerCase().includes(normalizedQuery),
  );

  function sendMessage(event) {
    event.preventDefault();
    const question = draft.trim();
    if (!question) return;
    const match = terms.find(
      (item) =>
        question.toLowerCase().includes(item.term.toLowerCase()) ||
        item.term.toLowerCase().includes(question.toLowerCase()),
    );
    const answer = match
      ? `${match.term}: ${match.definition}`
      : "That’s a thoughtful question. I can help with interpreting terms like consecutive interpreting, sight translation, source language, and more. Try searching the glossary for a deeper definition.";
    setMessages((current) => [
      ...current,
      { from: "you", text: question },
      { from: "guide", text: answer },
    ]);
    setDraft("");
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="inner-page page-wrap chat-page"
    >
      <section className="page-intro">
        <Eyebrow>A HUMAN-SIZED LANGUAGE DESK</Eyebrow>
        <h1>
          Let’s find the <em>right words.</em>
        </h1>
        <p>
          Ask a question about interpreting, or look up a term from our field
          guide.
        </p>
      </section>
      <section className="chat-shell" aria-label="Language desk chat">
        <div className="chat-topline">
          <div className="desk-status">
            <span className="online-dot" />
            LANGUAGE DESK <span className="desk-divider">/</span> ENGLISH
          </div>
          <label className="chat-search">
            <span aria-hidden="true">⌕</span>
            <input
              aria-label="Search conversation"
              placeholder="Search conversation"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button
                type="button"
                aria-label="Clear conversation search"
                onClick={() => setQuery("")}
              >
                ×
              </button>
            )}
          </label>
        </div>
        <div
          className="message-list"
          role="log"
          aria-label="Conversation messages"
          aria-live="polite"
          aria-relevant="additions text"
        >
          {visibleMessages.length ? (
            visibleMessages.map((message, index) => (
              <div
                key={`${index}-${message.from}`}
                className={`message-row ${message.from === "you" ? "message-you" : ""}`}
              >
                <span className="message-avatar">
                  {message.from === "you" ? "Y" : "i."}
                </span>
                <div className="message-content">
                  <span>
                    {message.from === "you" ? "YOU" : "THE LANGUAGE DESK"}
                  </span>
                  <p>{message.text}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="chat-no-results">No messages match “{query}”.</div>
          )}
        </div>
        <form className="chat-compose" onSubmit={sendMessage}>
          <input
            aria-label="Your message"
            placeholder="Ask a question about interpreting…"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim()}
          >
            Send <span aria-hidden="true">↗</span>
          </button>
        </form>
        <div className="chat-suggestions">
          <span>TRY ASKING</span>
          <button
            type="button"
            onClick={() => setDraft("What is consecutive interpreting?")}
          >
            What is consecutive interpreting?
          </button>
          <button
            type="button"
            onClick={() => setDraft("What’s a target language?")}
          >
            What’s a target language?
          </button>
        </div>
      </section>
    </main>
  );
}

export default ChatPage;
