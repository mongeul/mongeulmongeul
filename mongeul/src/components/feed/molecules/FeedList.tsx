"use client";

import { Feed } from "@/types/feedTypes";
import FeedItem from "../atoms/FeedItem";

export default function FeedList() {
  const articles: Feed[] = [
    { feedId: 87, feeling: "HAPPY" },
    { feedId: 23, feeling: "SAD" },
    { feedId: 14, feeling: "SOSO" },
    { feedId: 34, feeling: "HAPPY" },
    { feedId: 76, feeling: "SAD" },
    { feedId: 89, feeling: "SOSO" },
    { feedId: 42, feeling: "HAPPY" },
    { feedId: 7, feeling: "SAD" },
    { feedId: 66, feeling: "SOSO" },
    { feedId: 25, feeling: "HAPPY" },
    { feedId: 92, feeling: "SAD" },
    { feedId: 50, feeling: "SOSO" },
  ];

  return (
    <div>
      {articles.map((article) => (
        <FeedItem key={article.feedId} feed={article} />
      ))}
    </div>
  );
}
