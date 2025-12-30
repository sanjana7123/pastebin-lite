import { redis } from "../../../lib/redis";
import { nanoid } from "nanoid";

export async function POST(req) {
  const body = await req.json();
  if (!body.content || typeof body.content !== "string") {
    return Response.json({ error: "Invalid content" }, { status: 400 });
  }

  const id = nanoid();
  const now = Date.now();

  await redis.set(`paste:${id}`, {
    content: body.content,
    createdAt: now,
    expiresAt: body.ttl_seconds ? now + body.ttl_seconds * 1000 : null,
    maxViews: body.max_views ?? null,
    views: 0,
  });

  return Response.json({
    id,
    // return a relative URL so deployments that don't set NEXT_PUBLIC_BASE_URL
    // still work. The client will build an absolute URL if needed.
    url: `/p/${id}`,
  });
}
