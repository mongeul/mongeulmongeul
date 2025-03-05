package com.specup.mongeul.domain.diary.dto.request.Diary;

import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class DiaryUpdateRequest {
    private String title;
    private String content;
    private MultipartFile picture;
    private LocalDate date;
    private String pictureLines;
    private DiaryWeather weather;
    private DiaryFeeling feeling;
    private DiaryPrivate privateStatus;
}
