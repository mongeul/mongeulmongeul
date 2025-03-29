package com.specup.mongeul.domain.diaryemoji.service;

import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.repository.DiaryRepository;
import com.specup.mongeul.domain.diaryemoji.entity.DiaryEmoji;
import com.specup.mongeul.domain.diaryemoji.repository.DiaryEmojiRepository;
import com.specup.mongeul.domain.emoji.entity.Emoji;
import com.specup.mongeul.domain.emoji.repository.EmojiRepository;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DiaryEmojiService {
    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;
    private final EmojiRepository emojiRepository;
    private final DiaryEmojiRepository diaryEmojiRepository;

    @Transactional
    public void addEmoji(Long diaryId, Long emojiId, Long userId) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        Emoji emoji = emojiRepository.findById(emojiId)
                .orElseThrow(() -> new CustomException(ErrorCode.EMOJI_NOT_FOUND));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if (diaryEmojiRepository.existsByDiaryIdAndEmojiIdAndUserId(diaryId, emojiId, userId)) {
            throw new CustomException(ErrorCode.EMOJI_ALREADY_ADDED);
        }

        try {
            diaryEmojiRepository.save(DiaryEmoji.create(diary, emoji, user));
        } catch (DataIntegrityViolationException e) {
            throw new CustomException(ErrorCode.EMOJI_ALREADY_ADDED);
        }
    }

    @Transactional
    public void deleteEmoji(Long diaryId, Long emojiId, Long userId) {
        DiaryEmoji diaryEmoji = diaryEmojiRepository.findByDiaryIdAndEmojiIdAndUserId(diaryId, emojiId, userId)
                        .orElseThrow(() -> new CustomException(ErrorCode.EMOJI_NOT_FOUND));
        diaryEmojiRepository.delete(diaryEmoji);
    }
}
