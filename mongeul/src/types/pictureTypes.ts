export type Brush = "pen" | "pencil" | "eraser";

export interface PictureLine {
  points: [number, number][];
  stroke: string;
  strokeWidth: number;
}

export interface PictureLineResponse {
  diaryId: number;
  data: PictureLine[];
  message: string;
}
