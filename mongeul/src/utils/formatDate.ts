export const formatDate = (date: string) => {
  console.log("formatDate에 전달된 date:", date);

  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
