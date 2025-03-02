package com.specup.mongeul.domain.diary.dto.response.ShareDiary;

import com.specup.mongeul.domain.diary.entity.ShareDiary;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@ToString
public class ShareDiaryDateResponse {
    private LocalDate date;

    public static ShareDiaryDateResponse from(ShareDiary shareDiary) {
        ShareDiaryDateResponse response = new ShareDiaryDateResponse();
        response.date = shareDiary.getDate();
        return response;
    }
}
