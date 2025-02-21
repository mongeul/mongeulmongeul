import CategoryCard from "../molecules/CategoryCard";

const PersonalSetting = [
  { label: "닉네임 변경", link: "/setting/nickname" },
  { label: "일기 잠금 설정", link: "/setting/diary-lock" },
];
const DisplaySetting = [
  { label: "테마 설정", link: "/setting/theme" },
  { label: "폰트 설정", link: "/setting/font" },
];
const AuthSetting = [
  { label: "로그아웃", link: "/setting/nickname" },
  { label: "회원 탈퇴", link: "/setting/lock" },
];

export default function SettingTemplates() {
  return (
    <div className="flex flex-col w-full h-full gap-6">
      <CategoryCard categories={PersonalSetting} title={"개인 설정"} />
      <CategoryCard categories={DisplaySetting} title={"화면 설정"} />
      <CategoryCard categories={AuthSetting} title={"계정"} />
    </div>
  );
}
