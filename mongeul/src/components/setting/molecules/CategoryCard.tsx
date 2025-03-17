import Card from "@/components/common/atoms/Card";
import Line from "../atoms/Line";
import Title from "../atoms/Title";
import Link from "next/link";

interface Category {
  link?: string;
  label: string;
  action?: () => void;
}

interface CategoryCardProps {
  categories: Category[];
  title: string;
}

export default function CategoryCard({ categories, title }: CategoryCardProps) {
  return (
    <div>
      <Title text={title} />
      <Card padding="py-1" width="w-full" height="h-auto">
        <div className="w-full">
          {categories.map((category, idx) => (
            <div key={category.label}>
              {category.link ? ( // ✅ 링크가 있는 경우
                <Link href={category.link} className="block">
                  <div className="px-6 py-3 w-full text-gray-600">
                    {category.label}
                  </div>
                </Link>
              ) : category.action ? ( // ✅ action이 있는 경우
                <div
                  className="px-6 py-3 w-full text-gray-600 cursor-pointer"
                  onClick={category.action}
                >
                  {category.label}
                </div>
              ) : null}
              {idx !== categories.length - 1 && <Line />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
