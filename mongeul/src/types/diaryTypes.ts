import { DrawingLine } from "./drawingTypes";

export type Feelings = "HAPPY" | "SOSO" | "SAD" | "";

export type PrivateStatus = "PUBLIC" | "PRIVATE" | "LOCK";

export type Weather = "SUNNY" | "CLOUDY" | "RAINY" | "";

export interface BaseDiary {
  title: string;
  content: string;
  picture?: string;
  date: string;
  weather: Weather;
  feelings: Feelings;
  privateStatus: PrivateStatus;
}

export interface DiaryRequest extends BaseDiary {
  pictureLines?: DrawingLine[];
}

export interface Diary extends BaseDiary {
  diaryId: number;
}

export interface DiaryResponse {
  success: boolean;
  message: string;
  data: Diary | null;
}
