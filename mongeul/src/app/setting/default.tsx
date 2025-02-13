import Link from "next/link";

export default function Page() {
  return (
    <div>
      설정 페이지 목록 - default
      <div>
        <Link href={"/setting/font"}>글꼴 변경</Link>
      </div>
      <div>
        <Link href={"/setting/theme"}>테마 변경</Link>
      </div>
    </div>
  );
}
