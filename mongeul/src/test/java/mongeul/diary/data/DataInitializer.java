package mongeul.diary.data;

import com.specup.mongeul.MongeulApplication;
import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@ContextConfiguration(classes = MongeulApplication.class)
@SpringBootTest
public class DataInitializer {
    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    TransactionTemplate transactionTemplate;

    CountDownLatch latch = new CountDownLatch(EXECUTE_COUNT);

    @Autowired
    private UserRepository userRepository;

    static final int BULK_INSERT_SIZE = 2000;
    static final int EXECUTE_COUNT = 6000;

    @Test
    void initialize() throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(10);
        for (int i = 0; i < EXECUTE_COUNT; i++) {
            executorService.submit(() -> {
                insert();
                latch.countDown();
                System.out.println("latch = " + latch.getCount());
            });
        }
        latch.await();
        executorService.shutdown();
    }

    void insert() {
        transactionTemplate.executeWithoutResult(status -> {
            User user = userRepository.findById(1L)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            for (int i = 0; i < BULK_INSERT_SIZE; i++) {
                Diary diary = Diary.create(
                        "title" + i,
                        "content" + i,
                        null,
                        DiaryWeather.SUNNY,
                        DiaryFeeling.HAPPY,
                        DiaryPrivate.PUBLIC,
                        user
                );
                entityManager.persist(diary);
            }
        });
    }
}
