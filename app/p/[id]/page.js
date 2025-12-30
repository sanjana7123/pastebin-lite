
import { redis } from "../../../lib/redis";

import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const data = await redis.get(`paste:${params.id}`);
  if (!data) notFound();

  data.views += 1;
  await redis.set(`paste:${params.id}`, data);

  return <pre>{data.content}</pre>;
}
