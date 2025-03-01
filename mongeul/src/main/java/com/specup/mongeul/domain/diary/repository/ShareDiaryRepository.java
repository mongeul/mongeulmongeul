package com.specup.mongeul.domain.diary.repository;

import com.specup.mongeul.domain.diary.entity.ShareDiary;
import com.specup.mongeul.domain.friends.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ShareDiaryRepository extends JpaRepository<ShareDiary, Long> {

    // 그룹의 해당 날짜 공유일기 체크
    boolean existsByGroupAndDate(@Param("group") Friend group,
                                 @Param("date") LocalDate date);

    // 해당 그룹의 최근 공유일기 조회
    @Query("""
        SELECT sd FROM ShareDiary sd
        WHERE sd.group = :group
        ORDER BY sd.date DESC
        LIMIT 1
    """)
    ShareDiary findLatestByGroup(Friend group);

    // 공유일기 월별 조회 (캘린더)
    @Query("""
        SELECT sd FROM ShareDiary sd
        WHERE sd.group = :group
          AND sd.date >= :startOfMonth
          AND sd.date < :startOfNextMonth
        ORDER BY sd.date DESC
    """)
    List<ShareDiary> findByGroupAndDateBetween(@Param("group") Friend group,
                                               @Param("startOfMonth") LocalDate startOfMonth,
                                               @Param("startOfNextMonth") LocalDate startOfNextMonth);
}
