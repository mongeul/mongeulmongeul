package com.specup.mongeul.domain.diary.dto.request;

import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class DiaryCreateRequest {
    private String title;
    private String content;
    private String picture;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
    private DiaryPrivate privateStatus;
}
