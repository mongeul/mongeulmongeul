package com.specup.mongeul.domain.diaryemoji.service;

import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.repository.DiaryRepository;
import com.specup.mongeul.domain.diaryemoji.dto.request.DiaryEmojiRequest;
import com.specup.mongeul.domain.diaryemoji.entity.DiaryEmoji;
import com.specup.mongeul.domain.diaryemoji.repository.DiaryEmojiRepository;
import com.specup.mongeul.domain.emoji.entity.Emoji;
import com.specup.mongeul.domain.emoji.repository.EmojiRepository;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiaryEmojiService {
    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;
    private final EmojiRepository emojiRepository;
    private final DiaryEmojiRepository diaryEmojiRepository;

    @Transactional
    public boolean emojiToggle(Long userId, Long diaryId, DiaryEmojiRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        Emoji emoji = emojiRepository.findById(request.getEmojiId())
                .orElseThrow(() -> new CustomException(ErrorCode.EMOJI_NOT_FOUND));

        Optional<DiaryEmoji> existEmoji = diaryEmojiRepository.findByDiaryIdAndEmojiIdAndUserId(diaryId, request.getEmojiId(), userId);

        if (existEmoji.isPresent()) {
            diaryEmojiRepository.delete(existEmoji.get());
            return false;
        } else {
            diaryEmojiRepository.save(DiaryEmoji.create(diary, emoji, user));
            return true;
        }
    }
}
