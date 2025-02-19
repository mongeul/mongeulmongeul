interface BrushSelectButtonProps {
  onClick: () => void;
  selected: boolean;
  children: React.ReactNode;
}

export default function BrushSelectButton({
  onClick,
  selected,
  children,
}: BrushSelectButtonProps) {
  return (
    <button onClick={onClick}>
      <div className={selected ? "text-theme-400" : "text-gray-300"}>
        {children}
      </div>
    </button>
  );
}
