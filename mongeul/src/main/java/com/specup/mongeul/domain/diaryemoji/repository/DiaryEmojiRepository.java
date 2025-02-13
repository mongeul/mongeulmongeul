package com.specup.mongeul.domain.diaryemoji.repository;

import com.specup.mongeul.domain.diary.dto.response.DiaryEmojiResponse;
import com.specup.mongeul.domain.diaryemoji.entity.DiaryEmoji;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryEmojiRepository extends JpaRepository<DiaryEmoji, Long> {
    Optional<DiaryEmoji> findByDiaryIdAndEmojiIdAndUserId(Long diaryId, Long emojiId, Long userId);

    @Query("SELECT new com.specup.mongeul.domain.diary.dto.response.DiaryEmojiResponse(e.id, e.type, COUNT(de)) " +
            "FROM DiaryEmoji de " +
            "JOIN de.emoji e " +
            "WHERE de.diary.id = :diaryId " +
            "GROUP BY e.id, e.type")
    List<DiaryEmojiResponse> findEmojiCountByDiaryId(@Param("diaryId") Long diaryId);
}
