package com.specup.mongeul.domain.diaryemoji.dto.response;

import com.specup.mongeul.domain.emoji.entity.ENUM.EmojiType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DiaryEmojiResponse {
    private EmojiType emojiType;
    private Long count;
    private Boolean isSelected;

    public static DiaryEmojiResponse from(EmojiType emojiType, Long count, Boolean isSelected) {
        DiaryEmojiResponse response = new DiaryEmojiResponse();
        response.emojiType = emojiType;
        response.count = count;
        response.isSelected = isSelected;
        return response;
    }
}
