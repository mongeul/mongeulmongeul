export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatRelativeDate = (dateString: string): string => {
  if (!dateString || typeof dateString !== "string") return "-";

  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return "-";

  const targetDate = new Date(year, month - 1, day);
  const today = new Date();
  const target = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffTime = now.getTime() - target.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "미래";
  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}달 전`;

  return `${Math.floor(diffDays / 365)}년 전`;
};
