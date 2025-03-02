import { DrawingLine } from "./drawingTypes";

export type Feeling = "HAPPY" | "SOSO" | "SAD" | "ANGRY" | "WOW" | null;

export type PrivateStatus = "PUBLIC" | "PRIVATE" | "LOCK";

export type Weather = "SUNNY" | "CLOUDY" | "RAINY" | "SNOWY" | null;

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
}

export interface Diary extends BaseDiary {
  diaryId: number;
  published: boolean;
}

export interface DiaryResponse {
  success: boolean;
  message: string;
  data: Diary[] | null;
}

export interface DiaryDate {
  date: string;
}

export interface DiaryDatesResponse {
  success: boolean;
  message: string;
  data: DiaryDate[];
}
