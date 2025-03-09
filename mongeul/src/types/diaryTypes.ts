import { PictureLine } from "./pictureTypes";

export type Feeling = "HAPPY" | "SOSO" | "SAD" | "ANGRY" | "WOW";

export type PrivateStatus = "PUBLIC" | "PRIVATE" | "LOCK";

export type Weather = "SUNNY" | "CLOUDY" | "RAINY" | "SNOWY";

export interface BaseDiary {
  title: string;
  content: string;
  picture?: string;
  date: string;
  weather: Weather | null;
  feeling: Feeling | null;
  privateStatus: PrivateStatus;
}

export interface DiaryRequest extends BaseDiary {
  pictureLines?: PictureLine[];
}

export interface DraftRequest extends Omit<BaseDiary, "picture"> {
  pictureLines?: PictureLine[];
}

export interface Diary extends BaseDiary {
  diaryId: number;
  published: boolean;
}

export interface Draft extends Omit<BaseDiary, "picture" | "pictureLines"> {
  diaryId: number;
  published: boolean;
}

export interface DiaryResponse {
  success: boolean;
  message: string;
  data: Diary[] | null;
}

export interface DraftResponse {
  success: boolean;
  message: string;
  data: Draft[] | null;
}

export interface DiaryDate {
  date: string;
}

export interface DiaryDatesResponse {
  success: boolean;
  message: string;
  data: DiaryDate[];
}

export interface IsDiaryResponse {
  success: boolean;
  data: number | null;
  message: string;
}
