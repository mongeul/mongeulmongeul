import { DrawingLine } from "./drawingTypes";

export type Feelings = "HAPPY" | "SOSO" | "SAD" | "";

export type PrivateStatus = "PUBLIC" | "PRIVATE" | "LOCK";

export type Weather = "SUNNY" | "CLOUDY" | "RAINY" | "";

export interface DiaryRequest {
  title: string;
  content: string;
  date: string;
  weather: Weather;
  feelings: Feelings;
  picture?: string;
  pictureLines?: DrawingLine;
  privateStatus: PrivateStatus;
}

export interface Diary extends DiaryRequest {
  diaryId: number;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiaryResponse {
  success: boolean;
  message: string;
  data: Diary | null;
}
