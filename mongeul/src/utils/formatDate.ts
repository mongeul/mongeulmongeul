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

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
};
