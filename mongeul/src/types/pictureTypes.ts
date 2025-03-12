export type Brush = "pen" | "highlighter" | "eraser";

export interface PictureLine {
  points: [number, number][];
  stroke: string;
  strokeWidth: number;
}

export interface PictureLineResponse {
  diaryId: number;
  data: {
    diaryId: number;
    pictureLines: PictureLine[];
  };
  message: string;
}
