export default function Divider() {
  return (
    <div className="flex items-center w-full max-w-xs my-6">
      <div className="flex-1 h-[1px] bg-gray-300"></div>
      <span className="mx-4 text-gray-400 text-lg font-medium">로그인</span>
      <div className="flex-1 h-[1px] bg-gray-300"></div>
    </div>
  );
}
