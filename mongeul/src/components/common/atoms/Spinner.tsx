export default function Spinner() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute w-10 h-10 border-4 border-transparent border-t-theme-500 rounded-full animate-spin"></div>
      <div className="absolute w-10 h-10 border-4 border-theme-300 opacity-50 rounded-full"></div>
    </div>
  );
}
