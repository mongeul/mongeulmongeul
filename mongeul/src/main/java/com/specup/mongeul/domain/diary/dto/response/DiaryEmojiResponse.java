package com.specup.mongeul.domain.diary.dto.response;

import com.specup.mongeul.domain.diaryemoji.entity.DiaryEmoji;
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
    private Long emojiId;
    private EmojiType emojiType;
    private Long count;

    public static DiaryEmojiResponse from(DiaryEmoji diaryEmoji) {
        DiaryEmojiResponse response = new DiaryEmojiResponse();
        response.emojiId = diaryEmoji.getEmoji().getId();
        response.emojiType = diaryEmoji.getEmoji().getType();
        return response;
    }
}
