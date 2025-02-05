package com.specup.mongeul.domain.diary.dto.request;

import com.specup.mongeul.domain.diary.entity.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.DiaryWeather;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class DiaryUpdateRequest {
    private String title;
    private String content;
    private boolean isLocked;
    private String picture;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
    private DiaryPrivate isPrivate;
}
