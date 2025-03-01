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
public class DiaryResponse {
    private Long diaryId;
    private String title;
    private String content;
    private String picture;
    private LocalDate date;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
    private DiaryPrivate privateStatus;
    private Boolean published;

    public static DiaryResponse from(Diary diary) {
        DiaryResponse response = new DiaryResponse();
        response.diaryId = diary.getId();
        response.title = diary.getTitle();
        response.content = diary.getContent();
        response.picture = diary.getPicture();
        response.date = diary.getDate();
        response.weather = diary.getWeather();
        response.feeling = diary.getFeeling();
        response.privateStatus = diary.getPrivateStatus();
        response.published = diary.getPublished();
        return response;
    }
}
