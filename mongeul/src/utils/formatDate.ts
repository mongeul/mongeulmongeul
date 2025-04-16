export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatMonthDate = (dateString: string): string => {
  if (!dateString || typeof dateString !== "string") return "-";

  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return "없음";

  return `${month}월 ${day}일`;
};
