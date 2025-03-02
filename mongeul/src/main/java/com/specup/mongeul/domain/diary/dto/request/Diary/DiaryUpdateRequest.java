package com.specup.mongeul.domain.diary.dto.request.Diary;

import com.specup.mongeul.domain.diary.dto.common.PictureLineDto;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@ToString
public class DiaryUpdateRequest {
    private String title;
    private String content;
    private String picture;
    private LocalDate date;
    private List<PictureLineDto> pictureLines;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
    private DiaryPrivate privateStatus;
}
