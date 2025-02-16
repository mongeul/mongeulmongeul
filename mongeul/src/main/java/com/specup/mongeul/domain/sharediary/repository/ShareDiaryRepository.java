package com.specup.mongeul.domain.sharediary.repository;

import com.specup.mongeul.domain.sharediary.entity.ShareDiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareDiaryRepository extends JpaRepository<ShareDiary, Long> {
}
