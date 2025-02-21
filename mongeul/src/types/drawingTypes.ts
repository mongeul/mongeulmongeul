export type Brush = "pen" | "pencil" | "eraser";

export interface DrawingLine {
  points: number[];
  stroke: string;
  strokeWidth: number;
}
