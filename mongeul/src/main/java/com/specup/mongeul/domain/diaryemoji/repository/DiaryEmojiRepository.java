package com.specup.mongeul.domain.diaryemoji.repository;

import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryEmojiResponse;
import com.specup.mongeul.domain.diaryemoji.entity.DiaryEmoji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryEmojiRepository extends JpaRepository<DiaryEmoji, Long> {

    boolean existsByDiaryIdAndEmojiIdAndUserId(Long diaryId, Long emojiId, Long userId);

    Optional<DiaryEmoji> findByDiaryIdAndEmojiIdAndUserId(Long diaryId, Long emojiId, Long userId);

    /**
     * 이모지 개수 세기 (group by, count 사용)
     */
    @Query("SELECT new com.specup.mongeul.domain.diary.dto.response.DiaryEmojiResponse(de.emoji.type, COUNT(de)) " +
            "FROM DiaryEmoji de " +
            "WHERE de.diary.id = :diaryId " +
            "GROUP BY de.emoji.type")
    List<DiaryEmojiResponse> findEmojiCountByDiaryId(@Param("diaryId") Long diaryId);
}
