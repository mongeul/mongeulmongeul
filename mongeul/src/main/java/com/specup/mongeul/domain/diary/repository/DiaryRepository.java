package com.specup.mongeul.domain.diary.repository;

import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    /**
     * 일기 월별 조회 (캘린더에서 사용)
     */
    @Query("""
        SELECT d FROM Diary d
        WHERE d.user = :user
          AND d.date >= :startOfMonth
          AND d.date < :startOfNextMonth
          AND d.published = true
        ORDER BY d.date DESC
    """)
    List<Diary> findByUserAndDateBetween(@Param("user") User user,
                                         @Param("startOfMonth") LocalDate startOfMonth,
                                         @Param("startOfNextMonth") LocalDate startOfNextMonth);

    /**
     * 하루 1개 일기 제한 검증 (데이터 조회안하고 존재여부만 체크)
     */
//    boolean existsByUserIdAndCreatedAtBetween(@Param("userId") Long userId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    boolean existsByUserIdAndDateAndPublished(@Param("userId") Long userId,
                                              @Param("date") LocalDate date,
                                              @Param("published")Boolean published);

    /**
     * 하루 1개 일기 제한 검증 (데이터를 조회해서 반환으로 체크)
     */
//    @Query("SELECT COUNT(d) > 0 FROM Diary d WHERE d.user.id = :userId AND d.createdAt BETWEEN :start AND :end")
//    Optional<Diary> findByUserIdAndCreatedAtBetween(Long userId, LocalDateTime start, LocalDateTime end);

    /**
     * 피드 무한 스크롤
     */
    @Query(value = """
        SELECT * FROM diaries
        WHERE private_status = 'PUBLIC'
          AND (:userId IS NULL OR user_id = :userId)
          AND published = true
        ORDER BY id DESC
        LIMIT :limit
    """, nativeQuery = true)
    List<Diary> findAllInfiniteScroll(@Param("userId") Long userId,
                                      @Param("limit") Long limit);

    @Query(value = """
        SELECT * FROM diaries
        WHERE private_status = 'PUBLIC'
          AND (:userId IS NULL OR user_id = :userId)
          AND id < :lastDiaryId
          AND published = true
        ORDER BY id DESC
        LIMIT :limit
    """, nativeQuery = true)
    List<Diary> findAllInfiniteScroll(@Param("userId") Long userId,
                                      @Param("lastDiaryId") Long lastDiaryId,
                                      @Param("limit") Long limit);
}
