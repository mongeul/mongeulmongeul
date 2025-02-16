package com.specup.mongeul.domain.sharediary.dto.response;

import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import com.specup.mongeul.domain.sharediary.entity.ShareDiary;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class ShareDiaryResponse {
    private Long shareDiaryId;
    private String title;
    private String content;
    private String picture;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
    private DiaryPrivate isPrivate;
    private Integer turn;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static ShareDiaryResponse from(ShareDiary shareDiary) {
        ShareDiaryResponse response = new ShareDiaryResponse();
        response.shareDiaryId = shareDiary.getId();
        response.title = shareDiary.getTitle();
        response.content = shareDiary.getContent();
        response.picture = shareDiary.getPicture();
        response.weather = shareDiary.getWeather();
        response.feeling = shareDiary.getFeeling();
        response.isPrivate = shareDiary.getIsPrivate();
        response.turn = shareDiary.getTurn();
        response.createdAt = shareDiary.getCreatedAt();
        response.modifiedAt = shareDiary.getModifiedAt();
        return response;
    }
}
