interface TextProps {
  text: string;
}

export default function Text({ text }: TextProps) {
  return <div className="w-full text-gray-500">{text}</div>;
}
