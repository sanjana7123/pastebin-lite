import { redis } from "../../../lib/redis";
import { notFound } from "next/navigation";

export default async function PastePage({ params }) {
  const data = await redis.get(`paste:${params.id}`);

  // If paste doesn't exist → 404
  if (!data) notFound();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      padding: 20,
      color: "#e5e7eb"
    }}>
      <pre style={{
        maxWidth: 800,
        margin: "0 auto",
        background: "#020617",
        padding: 20,
        borderRadius: 10,
        whiteSpace: "pre-wrap"
      }}>
        {data.content}
      </pre>
    </div>
  );
}
