package com.specup.mongeul.domain.diary.repository;

import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findByUserId(Long userId);
    Optional<Diary> findByUserIdAndCreatedAtBetween(Long userId, LocalDateTime start, LocalDateTime end);

    /**
     * 피드 무한 스크롤
     */
    @Query(
            value = "SELECT * FROM diaries d " +
                    "WHERE d.is_private = 'PUBLIC' " +
                    "ORDER BY d.id DESC " +
                    "LIMIT :limit",
            nativeQuery = true
    )
    List<Diary> findAllInfiniteScroll(@Param("limit") Long limit);

    @Query(
            value = "SELECT * FROM diaries d " +
                    "WHERE d.is_private = 'PUBLIC' " +
                    "AND d.id < :lastDiaryId " +
                    "ORDER BY d.id DESC " +
                    "LIMIT :limit",
            nativeQuery = true
    )
    List<Diary> findAllInfiniteScroll(@Param("lastDiaryId") Long lastDiaryId, @Param("limit") Long limit);
}
