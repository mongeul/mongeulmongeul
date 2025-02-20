package mongeul.emoji;

import com.specup.mongeul.global.common.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.*;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("이모지 API 테스트")
public class EmojiApiTest {
    RestClient restClient;
    String token;

    @BeforeEach
    void setUp() {
        restClient = RestClient.create("http://localhost:8080");
        token = loginAndGetToken();
    }

    private String loginAndGetToken() {
        ApiResponse<LoginResponse> response = restClient.post()
                .uri("/api/v1/login")
                .body(new LoginRequest("testUser", "password123!!"))
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<LoginResponse>>() {});
        return "Bearer " + response.getData().getAccessToken();
    }

    @Test
    @DisplayName("이모지 추가 & 삭제 테스트")
    void emojiAddAndDeleteTest() {
        Long diaryId = 3L;
        Long emojiId = 1L;

        // 🕒 실행 시간 측정 시작
        Instant start = Instant.now();

        // ✅ 이모지 추가
        addEmoji(token, diaryId, emojiId);

        // ✅ 이모지 삭제
        deleteEmoji(token, diaryId, emojiId);

        // 🕒 실행 시간 측정 종료
        Instant end = Instant.now();
        System.out.println("✅ 전체 테스트 실행 시간: " + Duration.between(start, end).toMillis() + "ms");
    }

    void addEmoji(String token, Long diaryId, Long emojiId) {
        ApiResponse<Void> response = restClient.post()
                .uri("/api/v1/feeds/{diaryId}/emojis/{emojiId}", diaryId, emojiId)
                .headers(headers -> headers.set(HttpHeaders.AUTHORIZATION, token))
                .contentType(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<Void>>() {});

        assertThat(response).isNotNull();
        System.out.println("✅ 이모지 추가 완료: diaryId=" + diaryId + ", emojiId=" + emojiId);
    }

    void deleteEmoji(String token, Long diaryId, Long emojiId) {
        restClient.delete()
                .uri("/api/v1/feeds/{diaryId}/emojis/{emojiId}", diaryId, emojiId)
                .headers(headers -> headers.set(HttpHeaders.AUTHORIZATION, token))
                .retrieve()
                .toBodilessEntity();

        System.out.println("✅ 이모지 삭제 완료: diaryId=" + diaryId + ", emojiId=" + emojiId);
    }

    /**
     * 🏷 동시성 테스트 - 여러 개의 이모지 추가 요청을 동시에 보내고 락이 잘 적용되는지 확인
     */
    @Test
    @DisplayName("동시 이모지 추가 테스트 (비관적 락 테스트)")
    void concurrentEmojiAddTest() throws InterruptedException, ExecutionException {
        Long diaryId = 3L;
        Long emojiId = 1L;

        ExecutorService executorService = Executors.newFixedThreadPool(2);

        Callable<Void> task1 = () -> {
            System.out.println("🔹 Thread 1: 이모지 추가 시작");
            Instant start = Instant.now();

            addEmoji(token, diaryId, emojiId);

            Instant end = Instant.now();
            System.out.println("🔹 Thread 1: 실행 시간: " + Duration.between(start, end).toMillis() + "ms");
            return null;
        };

        Callable<Void> task2 = () -> {
            Thread.sleep(1000); // Thread 1이 락을 잡을 시간을 주기 위해 1초 대기
            System.out.println("🔸 Thread 2: 이모지 추가 시도");
            Instant start = Instant.now();

            try {
                addEmoji(token, diaryId, emojiId);
                System.out.println("✅ Thread 2: 이모지 추가 성공");
            } catch (Exception e) {
                System.err.println("🚨 Thread 2: 락 충돌 발생! - " + e.getMessage());
            }

            Instant end = Instant.now();
            System.out.println("🔸 Thread 2: 실행 시간: " + Duration.between(start, end).toMillis() + "ms");
            return null;
        };

        Future<Void> future1 = executorService.submit(task1);
        Future<Void> future2 = executorService.submit(task2);

        future1.get();
        future2.get();
    }

    @Getter
    @AllArgsConstructor
    static class LoginRequest {
        private String userId;
        private String password;
    }

    @Getter
    static class LoginResponse {
        private String accessToken;
    }
}
