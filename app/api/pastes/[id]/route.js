import { redis } from "../../../../lib/redis";
import { nowMs } from "../../../../lib/time";

export async function GET(req, { params }) {
  const data = await redis.get(`paste:${params.id}`);
  if (!data) return Response.json({ error: "Not found" }, { status: 404 });

  const now = nowMs(req.headers);
  if ((data.expiresAt && now >= data.expiresAt) ||
      (data.maxViews !== null && data.views >= data.maxViews)) {
    return Response.json({ error: "Unavailable" }, { status: 404 });
  }

  data.views += 1;
  await redis.set(`paste:${params.id}`, data);

  return Response.json({
    content: data.content,
    remaining_views: data.maxViews === null ? null : data.maxViews - data.views,
    expires_at: data.expiresAt ? new Date(data.expiresAt).toISOString() : null,
  });
}
