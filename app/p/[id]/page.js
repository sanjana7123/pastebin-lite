async function getPaste(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/pastes/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function PastePage({ params }) {
  const data = await getPaste(params.id);

  if (!data) {
    return (
      <h2 style={{ padding: 20 }}>
        Paste not found or expired
      </h2>
    );
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
