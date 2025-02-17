export type Feelings = "happy" | "soso" | "sad" | "";

export type Disclosure = "PUBLIC" | "PRIVATE" | "LOCK";

export type Weather = "sunny" | "cloudy" | "rainy" | "";

export interface DiaryCreate {
  title: string;
  content: string;
  date: string;
  weather: Weather;
  feelings: Feelings;
  drawing?: string;
  disclosure: Disclosure;
}

export interface DiaryRead extends Omit<DiaryCreate, "date"> {
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
