package com.specup.mongeul.domain.diary.repository;

import com.specup.mongeul.domain.diary.entity.Diary;
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
    @Query("SELECT COUNT(d) > 0 FROM Diary d WHERE d.user.id = :userId AND d.createdAt BETWEEN :start AND :end")
    boolean existsByUserIdAndCreatedAtBetween(@Param("userId") Long userId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

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
