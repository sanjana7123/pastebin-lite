"use client";

import { useEffect, useState } from "react";

export default function PastePage({ params }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/pastes/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, [params.id]);

  if (error) {
    return <h2 style={{ padding: 20 }}>Paste not found or expired</h2>;
  }

  if (!data) {
    return <h2 style={{ padding: 20 }}>Loading paste...</h2>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        padding: 20,
        color: "#e5e7eb",
      }}
    >
      <pre
        style={{
          maxWidth: 800,
          margin: "0 auto",
          background: "#020617",
          padding: 20,
          borderRadius: 10,
          whiteSpace: "pre-wrap",
        }}
      >
        {data.content}
      </pre>
    </div>
  );
}
