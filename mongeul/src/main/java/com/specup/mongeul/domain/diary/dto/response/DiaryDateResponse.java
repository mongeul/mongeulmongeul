package com.specup.mongeul.domain.diary.dto.response;

import com.specup.mongeul.domain.diary.entity.Diary;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@ToString
public class DiaryDateResponse {
    private LocalDate date;

    public static DiaryDateResponse from(Diary diary) {
        DiaryDateResponse response = new DiaryDateResponse();
        response.date = diary.getDate();
        return response;
    }
}
