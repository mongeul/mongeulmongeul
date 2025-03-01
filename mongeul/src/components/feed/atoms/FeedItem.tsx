"use client";

import FeelingIcon from "@/components/common/atoms/FeelingsIcon";
import { Feed } from "@/types/feedTypes";
import Link from "next/link";

interface FeedItemProps {
  feed: Feed;
}

export default function FeedItem({ feed }: FeedItemProps) {
  const { icon } = FeelingIcon({ feeling: feed.feeling });

  return (
    <Link href={`/feed/${feed.feedId}`}>
      <div className="cursor-pointer">{icon}</div>
    </Link>
  );
}
