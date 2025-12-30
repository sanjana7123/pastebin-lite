import { redis } from "../../../../lib/redis";
import { nowMs } from "../../../../lib/time";

export async function GET(req, { params }) {
  const data = await redis.get(`paste:${params.id}`);
  if (!data) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const now = nowMs(req.headers);

  if (data.expiresAt && now >= data.expiresAt) {
    return Response.json({ error: "Expired" }, { status: 404 });
  }

  if (typeof data.maxViews === "number" && data.views >= data.maxViews) {
    return Response.json({ error: "View limit exceeded" }, { status: 404 });
  }

  const updatedViews = data.views + 1;

  await redis.set(`paste:${params.id}`, {
    ...data,
    views: updatedViews,
  });

  return Response.json({
    content: data.content,
    remaining_views:
      typeof data.maxViews === "number"
        ? Math.max(0, data.maxViews - updatedViews)
        : null,
    expires_at: data.expiresAt
      ? new Date(data.expiresAt).toISOString()
      : null,
  });
}
