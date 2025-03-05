package com.specup.mongeul.domain.diary.dto.response.Diary;

import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@ToString
public class DiaryDraftResponse {
    private Long diaryId;
    private String title;
    private String content;
    private LocalDate date;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
    private DiaryPrivate privateStatus;
    private Boolean published;

    public static DiaryDraftResponse from(Diary diary) {
        DiaryDraftResponse response = new DiaryDraftResponse();
        response.diaryId = diary.getId();
        response.title = diary.getTitle();
        response.content = diary.getContent();
        response.date = diary.getDate();
        response.weather = diary.getWeather();
        response.feeling = diary.getFeeling();
        response.privateStatus = diary.getPrivateStatus();
        response.published = diary.getPublished();
        return response;
    }
}
