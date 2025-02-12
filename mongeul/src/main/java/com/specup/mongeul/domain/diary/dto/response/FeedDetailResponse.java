package com.specup.mongeul.domain.diary.dto.response;

import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@ToString
public class FeedDetailResponse {
    private Long feedId;
    private String title;
    private String content;
    private boolean isLocked;
    private String picture;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
    private DiaryPrivate isPrivate;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<DiaryEmojiResponse> emojis;

    public static FeedDetailResponse from(Diary diary, List<DiaryEmojiResponse> emojis) {
        FeedDetailResponse response = new FeedDetailResponse();
        response.feedId = diary.getId();
        response.title = diary.getTitle();
        response.content = diary.getContent();
        response.isLocked = diary.isLocked();
        response.picture = diary.getPicture();
        response.weather = diary.getWeather();
        response.feeling = diary.getFeeling();
        response.isPrivate = diary.getIsPrivate();
        response.createdAt = diary.getCreatedAt();
        response.modifiedAt = diary.getModifiedAt();
        response.emojis = emojis;
        return response;
    }
}
