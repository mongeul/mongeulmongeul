export type Brush = "pen" | "eraser";

export interface DrawingLine {
  points: number[];
  stroke: string;
  strokeWidth: number;
}
