package com.specup.mongeul.domain.diary.repository;

import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    List<Diary> findByUserId(Long userId);

    /**
     * 일기 월별 조회 (캘린더에서 사용)
     */
    @Query("""
        SELECT d
        FROM Diary d
        WHERE d.user = :user
          AND d.createdAt >= :startOfMonth
          AND d.createdAt < :startOfNextMonth
        ORDER BY d.createdAt DESC
        LIMIT 31
    """)
    List<Diary> findByUserAndCreatedAtBetween(
            @Param("user") User user,
            @Param("startOfMonth") LocalDateTime startOfMonth,
            @Param("startOfNextMonth") LocalDateTime startOfNextMonth);

    /**
     * 하루 1개 일기 제한 검증
     */
    boolean existsByUserIdAndCreatedAtBetween(@Param("userId") Long userId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

//    @Query("SELECT COUNT(d) > 0 FROM Diary d WHERE d.user.id = :userId AND d.createdAt BETWEEN :start AND :end")
//    Optional<Diary> findByUserIdAndCreatedAtBetween(Long userId, LocalDateTime start, LocalDateTime end);

    /**
     * 피드 무한 스크롤
     */
    @Query("SELECT d FROM Diary d " +
            "WHERE d.privateStatus = com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate.PUBLIC " +
            "ORDER BY d.id DESC " +
            "LIMIT :limit")
    List<Diary> findAllInfiniteScroll(@Param("limit") Long limit);

    @Query("SELECT d FROM Diary d " +
            "WHERE d.privateStatus = com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate.PUBLIC " +
            "AND d.id < :lastDiaryId " +
            "ORDER BY d.id DESC " +
            "LIMIT :limit")
    List<Diary> findAllInfiniteScroll(@Param("lastDiaryId") Long lastDiaryId, @Param("limit") Long limit);
}
