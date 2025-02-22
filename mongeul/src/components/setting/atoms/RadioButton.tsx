interface RadioButtonProps {
  value: string;
  selected: boolean;
  onChange: () => void;
}

export default function RadioButton({
  value,
  selected,
  onChange,
}: RadioButtonProps) {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        value={value}
        checked={selected}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-5 h-5 rounded-full border-2 ${
          selected ? "bg-theme-500 border-theme-500" : "border-gray-400"
        } flex items-center justify-center`}
        onClick={onChange}
      >
        {selected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
      </div>
    </div>
  );
}
