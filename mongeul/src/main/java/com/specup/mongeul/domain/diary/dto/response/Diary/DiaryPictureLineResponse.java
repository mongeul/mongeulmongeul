package com.specup.mongeul.domain.diary.dto.response.Diary;

import com.specup.mongeul.domain.diary.dto.common.PictureLineDto;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class DiaryPictureLineResponse {
    private Long diaryId;
    private List<PictureLineDto> pictureLines;

    public static DiaryPictureLineResponse from(Long diaryId, List<PictureLineDto> pictureLines) {
        DiaryPictureLineResponse response = new DiaryPictureLineResponse();
        response.diaryId = diaryId;
        response.pictureLines = pictureLines;
        return response;
    }
}
