package com.specup.mongeul.domain.diary.dto.response;

import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.entity.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.DiaryWeather;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class DiaryResponse {
    private Long diaryId;
    private String title;
    private String content;
    private boolean isLocked;
    private String picture;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
    private DiaryPrivate isPrivate;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static DiaryResponse from(Diary diary) {
        DiaryResponse response = new DiaryResponse();
        response.diaryId = diary.getId();
        response.title = diary.getTitle();
        response.content = diary.getContent();
        response.isLocked = diary.isLocked();
        response.picture = diary.getPicture();
        response.weather = diary.getWeather();
        response.feeling = diary.getFeeling();
        response.isPrivate = diary.getIsPrivate();
        response.createdAt = diary.getCreatedAt();
        response.modifiedAt = diary.getModifiedAt();
        return response;
    }
}
