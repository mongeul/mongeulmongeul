interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <div className="w-full h-auto px-5 py-2 text-gray-500">
      <p>{text}</p>
    </div>
  );
}
