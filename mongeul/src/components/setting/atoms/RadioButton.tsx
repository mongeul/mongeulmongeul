interface RadioButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onClick: () => void;
}

export default function RadioButton({
  label,
  value,
  selected,
  onClick,
}: RadioButtonProps) {
  return (
    <label className="w-full flex flex-row justify-between">
      <input
        type="radio"
        value={value}
        checked={selected}
        onChange={onClick}
        className="hidden"
      />
      <div
        className={`w-5 h-5 rounded-full border-2 ${
          selected ? "bg-blue-500 border-blue-500" : "border-gray-400"
        } flex items-center justify-center`}
      >
        {selected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
      </div>
      <span>{label}</span>
    </label>
  );
}
