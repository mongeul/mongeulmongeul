import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full md:w-3/4 flex justify-between p-4">
        <Link href="/">몽글몽글</Link>
        <Link href="/notification">알림</Link>
      </div>
    </div>
  );
}
