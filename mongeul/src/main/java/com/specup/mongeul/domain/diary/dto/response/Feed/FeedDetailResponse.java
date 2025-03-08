package com.specup.mongeul.domain.diary.dto.response.Feed;

import com.specup.mongeul.domain.diaryemoji.dto.response.DiaryEmojiResponse;
import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@ToString
public class FeedDetailResponse {
    private Long feedId;
    private String title;
    private String content;
    private String picture;
    private LocalDate date;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
    private DiaryPrivate privateStatus;
    private List<DiaryEmojiResponse> emojis;

    public static FeedDetailResponse from(Diary diary, List<DiaryEmojiResponse> emojis) {
        FeedDetailResponse response = new FeedDetailResponse();
        response.feedId = diary.getId();
        response.title = diary.getTitle();
        response.content = diary.getContent();
        response.picture = diary.getPicture();
        response.date = diary.getDate();
        response.weather = diary.getWeather();
        response.feeling = diary.getFeeling();
        response.privateStatus = diary.getPrivateStatus();
        response.emojis = emojis;
        return response;
    }
}
