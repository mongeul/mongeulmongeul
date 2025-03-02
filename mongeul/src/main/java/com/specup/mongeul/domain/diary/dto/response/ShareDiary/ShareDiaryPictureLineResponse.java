package com.specup.mongeul.domain.diary.dto.response.ShareDiary;

import com.specup.mongeul.domain.diary.dto.common.PictureLineDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ShareDiaryPictureLineResponse {
    private Long shareDiaryId;
    private List<PictureLineDto> pictureLines;

    public static ShareDiaryPictureLineResponse from(Long shareDiaryId, List<PictureLineDto> pictureLines) {
        ShareDiaryPictureLineResponse response = new ShareDiaryPictureLineResponse();
        response.shareDiaryId = shareDiaryId;
        response.pictureLines = pictureLines;
        return response;
    }
}
