export type Feelings = "happy" | "soso" | "sad" | "";

export type PrivateStatus = "PUBLIC" | "PRIVATE" | "LOCK";

export type Weather = "sunny" | "cloudy" | "rainy" | "";

export interface DiaryCreate {
  title: string;
  content: string;
  date: string;
  weather: Weather;
  feelings: Feelings;
  drawing?: string;
  privateStatus: PrivateStatus;
}

export interface DiaryRead extends DiaryCreate {
  diaryId: number;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiaryCreateResponse {
  success: boolean;
  message: string;
  data: DiaryRead | null;
}
