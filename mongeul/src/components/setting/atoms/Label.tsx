interface LabelProps {
  size: "small" | "large";
}

export default function Label({ size }: LabelProps) {
  return (
    <span
      className={`text-gray-500 ${size === "small" ? "text-sm" : "text-xl"}`}
    >
      가
    </span>
  );
}
