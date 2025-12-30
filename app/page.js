"use client";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const maxChars = 5000;

  async function submit() {
    if (!content.trim()) return alert("Paste cannot be empty");

    setLoading(true);
    setUrl("");

    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      alert("Failed to create paste");
      setLoading(false);
      return;
    }

    const data = await res.json();
    // Build an absolute URL client-side. Server returns a relative URL by default
    // so we ensure the user sees a working absolute link even if env is missing.
    const finalUrl = data.url && (data.url.startsWith("http://") || data.url.startsWith("https://"))
      ? data.url
      : `${location.origin}${data.url ?? `/p/${data.id}`}`;
    setUrl(finalUrl);
    setLoading(false);
  }

  function copyLink() {
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Pastebin Lite</h1>
        <p style={styles.subtitle}>
          Paste text, get a link, share it instantly.
        </p>

        <textarea
          style={styles.textarea}
          placeholder="Paste your text here..."
          value={content}
          maxLength={maxChars}
          onChange={(e) => setContent(e.target.value)}
        />

        <div style={styles.footer}>
          <span>{content.length}/{maxChars}</span>
          <button onClick={submit} disabled={loading} style={styles.button}>
            {loading ? "Creating..." : "Create Paste"}
          </button>
        </div>

        {url && (
          <div style={styles.result}>
            <p> Paste created</p>
            <a href={url} target="_blank">{url}</a>
            <button onClick={copyLink} style={styles.copy}>
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    color: "#e5e7eb",
  },
  card: {
    width: "100%",
    maxWidth: 700,
    background: "#020617",
    padding: 24,
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },
  title: {
    fontSize: 28,
    marginBottom: 6,
  },
  subtitle: {
    color: "#94a3b8",
    marginBottom: 16,
  },
  textarea: {
    width: "100%",
    minHeight: 220,
    background: "#020617",
    border: "1px solid #334155",
    borderRadius: 8,
    padding: 12,
    color: "#e5e7eb",
    resize: "vertical",
    outline: "none",
    fontSize: 14,
  },
  footer: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#94a3b8",
  },
  button: {
    background: "#2563eb",
    border: "none",
    padding: "8px 14px",
    borderRadius: 6,
    color: "#fff",
    cursor: "pointer",
  },
  result: {
    marginTop: 16,
    padding: 12,
    background: "#020617",
    border: "1px solid #334155",
    borderRadius: 8,
  },
  copy: {
    marginTop: 6,
    background: "#334155",
    border: "none",
    padding: "6px 10px",
    borderRadius: 6,
    color: "#fff",
    cursor: "pointer",
  },
};
