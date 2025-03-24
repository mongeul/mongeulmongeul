"use client";

import { useSearchParams } from "next/navigation";

export default function SearchParamsProvider({
  children,
}: {
  children: (diaryId: number | null, groupId: number | null) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const diaryId = searchParams.get("id")
    ? Number(searchParams.get("id"))
    : null;
  const groupId = searchParams.get("groupid")
    ? Number(searchParams.get("groupid"))
    : null;

  return <>{children(diaryId, groupId)}</>;
}
