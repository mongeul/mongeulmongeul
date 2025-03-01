export default function DraftList() {
  const drafts = [{ title: "제목" }];

  return (
    <div>
      {drafts.map((draft, index) => (
        <div key={index}>{draft.title}</div>
      ))}
    </div>
  );
}
