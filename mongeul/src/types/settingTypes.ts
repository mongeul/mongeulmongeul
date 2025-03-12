export type Theme = "sky" | "amber" | "lime" | "pink" | "stone";

export type Font =
  | "suit"
  | "nanum-square-round"
  | "gowun-dodum"
  | "sejong-geulggot"
  | "lady-watermelon";

export interface FontOption {
  label: string;
  value: Font;
}
