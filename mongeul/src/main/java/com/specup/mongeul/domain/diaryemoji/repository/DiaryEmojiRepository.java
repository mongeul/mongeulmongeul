package com.specup.mongeul.domain.diaryemoji.repository;

import com.specup.mongeul.domain.diaryemoji.entity.DiaryEmoji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DiaryEmojiRepository extends JpaRepository<DiaryEmoji, Long> {
    Optional<DiaryEmoji> findByDiaryIdAndEmojiIdAndUserId(Long diaryId, Long emojiId, Long userId);
}
