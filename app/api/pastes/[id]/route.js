import { redis } from "../../../../lib/redis";
import { nowMs } from "../../../../lib/time";

export async function GET(req, { params }) {
  const data = await redis.get(`paste:${params.id}`);
  if (!data) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const now = nowMs(req.headers);

  // expiry check
  if (data.expiresAt && now >= data.expiresAt) {
    return Response.json({ error: "Expired" }, { status: 404 });
  }

  // view limit check
  if (data.maxViews !== null && data.views >= data.maxViews) {
    return Response.json({ error: "View limit exceeded" }, { status: 404 });
  }

  // increment view ONLY here
  const updated = {
    ...data,
    views: data.views + 1,
  };

  await redis.set(`paste:${params.id}`, updated);

  return Response.json({
    content: data.content,
    remaining_views:
      data.maxViews === null ? null : data.maxViews - updated.views,
    expires_at: data.expiresAt
      ? new Date(data.expiresAt).toISOString()
      : null,
  });
}
