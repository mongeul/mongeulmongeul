package mongeul.diary.repository;

import com.specup.mongeul.MongeulApplication;
import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.repository.DiaryRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import java.util.List;

@Slf4j
@ContextConfiguration(classes = MongeulApplication.class)
@SpringBootTest
public class DiaryRepositoryTest {
    @Autowired
    DiaryRepository diaryRepository;

    @Test
    void findInfiniteScrollTest() {
        List<Diary> diaries = diaryRepository.findAllInfiniteScroll(1L, 30L);
        log.info("첫 페이지 조회된 일기 개수 = {}", diaries.size());
        for (Diary diary : diaries) {
            log.info("diaryId = {}", diary.getId());
        }

        Long lastDiaryId = diaries.get(diaries.size() - 1).getId();
        log.info("다음 페이지 ID = {}", lastDiaryId);
        List<Diary> diaries2 = diaryRepository.findAllInfiniteScroll(1L, 30L, 30L);
        log.info("다음 페이지 조회된 일기 개수 = {}", diaries.size());
        for (Diary diary : diaries2) {
            log.info("diaryId = {}", diary.getId());
        }
    }
}
