"use client";

import { Feed } from "@/types/feedTypes";
import FeedItem from "../atoms/FeedItem";

export default function FeedList() {
  const articles: Feed[] = [
    { feedId: 827, feeling: "HAPPY" },
    { feedId: 223, feeling: "SAD" },
    { feedId: 114, feeling: "SOSO" },
    { feedId: 344, feeling: "HAPPY" },
    { feedId: 76, feeling: "SAD" },
    { feedId: 89, feeling: "SOSO" },
    { feedId: 42, feeling: "HAPPY" },
    { feedId: 7, feeling: "SAD" },
    { feedId: 66, feeling: "SOSO" },
    { feedId: 25, feeling: "HAPPY" },
    { feedId: 92, feeling: "SAD" },
    { feedId: 50, feeling: "SOSO" },
    { feedId: 871, feeling: "HAPPY" },
    { feedId: 231, feeling: "SAD" },
    { feedId: 141, feeling: "SOSO" },
    { feedId: 341, feeling: "HAPPY" },
    { feedId: 761, feeling: "SAD" },
    { feedId: 891, feeling: "SOSO" },
    { feedId: 421, feeling: "HAPPY" },
    { feedId: 17, feeling: "SAD" },
    { feedId: 616, feeling: "SOSO" },
    { feedId: 215, feeling: "HAPPY" },
    { feedId: 912, feeling: "SAD" },
    { feedId: 510, feeling: "SOSO" },
    { feedId: 87, feeling: "HAPPY" },
    { feedId: 14, feeling: "SOSO" },
    { feedId: 34, feeling: "HAPPY" },
  ];

  return (
    <div className="relative w-full h-auto min-h-screen grid grid-cols-4 gap-4 p-4">
      {articles.map((article) => (
        <div key={article.feedId} className="relative w-full h-20">
          <FeedItem feed={article} />
        </div>
      ))}
    </div>
  );
}
