package com.specup.mongeul.domain.diary.dto.response;

import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class FeedDetailResponse {
    private Long feedId;
    private String title;
    private String content;
    private String picture;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
