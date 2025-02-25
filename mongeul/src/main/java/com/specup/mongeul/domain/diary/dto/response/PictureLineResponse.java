package com.specup.mongeul.domain.diary.dto.response;

import com.specup.mongeul.domain.diary.dto.common.PictureLineDto;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class PictureLineResponse {
    private Long diaryId;
    private List<PictureLineDto> pictureLines;

    public static PictureLineResponse from(Long diaryId, List<PictureLineDto> pictureLines) {
        PictureLineResponse response = new PictureLineResponse();
        response.diaryId = diaryId;
        response.pictureLines = pictureLines;
        return response;
    }
}
