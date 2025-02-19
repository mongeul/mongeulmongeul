package com.specup.mongeul.domain.diary.dto.response;

import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class DiaryResponse {
    private Long diaryId;
    private String title;
    private String content;
    private String picture;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
    private DiaryPrivate privateStatus;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static DiaryResponse from(Diary diary) {
        DiaryResponse response = new DiaryResponse();
        response.diaryId = diary.getId();
        response.title = diary.getTitle();
        response.content = diary.getContent();
        response.picture = diary.getPicture();
        response.weather = diary.getWeather();
        response.feeling = diary.getFeeling();
        response.privateStatus = diary.getPrivateStatus();
        response.createdAt = diary.getCreatedAt();
        response.modifiedAt = diary.getModifiedAt();
        return response;
    }
}
