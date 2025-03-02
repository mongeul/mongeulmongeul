package com.specup.mongeul.domain.diary.dto.response.ShareDiary;

import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import com.specup.mongeul.domain.diary.entity.ShareDiary;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@ToString
public class ShareDiaryResponse {
    private Long shareDiaryId;
    private String title;
    private String content;
    private String picture;
    private LocalDate date;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
    private String writer;
    private Boolean published;

    public static ShareDiaryResponse from(ShareDiary shareDiary) {
        ShareDiaryResponse response = new ShareDiaryResponse();
        response.shareDiaryId = shareDiary.getId();
        response.title = shareDiary.getTitle();
        response.content = shareDiary.getContent();
        response.picture = shareDiary.getPicture();
        response.date = shareDiary.getDate();
        response.weather = shareDiary.getWeather();
        response.feeling = shareDiary.getFeeling();
        response.writer = shareDiary.getWriter().getNickname();
        response.published = shareDiary.getPublished();
        return response;
    }
}
