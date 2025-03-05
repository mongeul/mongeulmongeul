package com.specup.mongeul.domain.diary.dto.request.ShareDiary;

import com.specup.mongeul.domain.diary.dto.common.PictureLineDto;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@ToString
public class ShareDiaryDraftRequest {
    private String title;
    private String content;
    private LocalDate date;
    private String pictureLines;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
}
