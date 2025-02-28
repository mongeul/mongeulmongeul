import PageWrapper from "@/components/write-diary/templates/PageWapper";
import WriteForm from "@/components/write-diary/templates/WriteForm";

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <WriteForm />
    </div>
  );
}
