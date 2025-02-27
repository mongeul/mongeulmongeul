package com.specup.mongeul.domain.diary.dto.response.Diary;

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

    public static DiaryEmojiResponse from(EmojiType emojiType, Long count) {
        DiaryEmojiResponse response = new DiaryEmojiResponse();
        response.emojiType = emojiType;
        response.count = count;
        return response;
    }
}
