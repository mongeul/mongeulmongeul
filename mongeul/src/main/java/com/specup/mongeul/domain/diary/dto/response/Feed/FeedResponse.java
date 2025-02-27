package com.specup.mongeul.domain.diary.dto.response.Feed;

import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class FeedResponse {
    private Long feedId;
    private DiaryFeeling feeling;

    public static FeedResponse from(Diary dairy) {
        FeedResponse response = new FeedResponse();
        response.feedId = dairy.getId();
        response.feeling = dairy.getFeeling();
        return response;
    }
}
