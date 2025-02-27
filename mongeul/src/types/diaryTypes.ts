import { DrawingLine } from "./drawingTypes";

export type Feeling = "HAPPY" | "SOSO" | "SAD" | "";

export type PrivateStatus = "PUBLIC" | "PRIVATE" | "LOCK";

export type Weather = "SUNNY" | "CLOUDY" | "RAINY" | "";

export interface BaseDiary {
  title: string;
  content: string;
  picture?: string;
  date: string;
  weather: Weather;
  feeling: Feeling;
  privateStatus: PrivateStatus;
}

export interface DiaryRequest extends BaseDiary {
  pictureLines?: DrawingLine[];
  isPublished: boolean;
}

export interface Diary extends BaseDiary {
  diaryId: number;
}

export interface DiaryResponse {
  success: boolean;
  message: string;
  data: Diary | null;
}
