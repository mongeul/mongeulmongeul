package com.specup.mongeul.domain.diary.repository;

import com.specup.mongeul.domain.diary.entity.ShareDiary;
import com.specup.mongeul.domain.friends.entity.Friend;
import com.specup.mongeul.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShareDiaryRepository extends JpaRepository<ShareDiary, Long> {

    // 그룹의 해당 날짜 공유일기 체크
    boolean existsByGroupAndDateAndPublished(@Param("group") Friend group,
                                             @Param("date") LocalDate date,
                                             @Param("published") Boolean published);

    // 임시저장 공유일기 목록 조회
    List<ShareDiary> findByWriterAndGroupAndPublishedOrderByDateDesc(@Param("writer") User user,
                                                                     @Param("group") Friend group,
                                                                     @Param("published") Boolean published);
    // 공유일기 1개 여부
    Long countByGroupAndPublished(Friend group, Boolean published);

    // 해당 그룹의 최근 공유일기 조회
    @Query("""
        SELECT sd FROM ShareDiary sd
        WHERE sd.group = :group
          AND sd.published = true
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
          AND sd.published = true
        ORDER BY sd.date DESC
    """)
    List<ShareDiary> findByGroupAndDateBetween(@Param("group") Friend group,
                                               @Param("startOfMonth") LocalDate startOfMonth,
                                               @Param("startOfNextMonth") LocalDate startOfNextMonth);

    // 해당 날짜 작성한 공유일기 찾기
    @Query("""
        SELECT sd FROM ShareDiary sd
        WHERE sd.group = :group
          AND sd.date = :date
    """)
    Optional<Long> findShareDiaryIdByGroupIdAndDate(@Param("group") Friend group,
                                                    @Param("date") LocalDate date);
}
