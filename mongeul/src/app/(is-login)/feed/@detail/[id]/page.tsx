"use client";

import { useParams } from "next/navigation";

export default function FeedPage() {
  const { id } = useParams();

  return <div>피드 ID: {id}</div>;
}
