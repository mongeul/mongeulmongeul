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
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("100명 유저의 이모지 등록 테스트")
public class EmojiMultiUserLoadTest {
    RestClient restClient;
    List<String> userTokens; // ✅ 100명의 유저 토큰 리스트

    @BeforeEach
    void setUp() {
        restClient = RestClient.create("http://localhost:8080");
        userTokens = new ArrayList<>();

        // ✅ 100명의 유저가 로그인하여 토큰 저장
        for (int i = 1; i <= 50; i++) {
            String token = loginAndGetToken("testUser" + i);
            userTokens.add(token);
        }
    }

    @Test
    @DisplayName("100명의 유저가 동시에 이모지 등록 테스트")
    void multiUserEmojiTest() throws InterruptedException, ExecutionException {
        Long diaryId = 15L; // ✅ DB에서 존재하는 diaryId인지 확인 필요
        Long[] emojiIds = {1L, 2L, 3L}; // 3가지 이모지를 번갈아 가며 등록

        ExecutorService executorService = Executors.newFixedThreadPool(20);
        List<Future<Void>> futures = new ArrayList<>();

        Instant start = Instant.now();

        for (int i = 0; i < userTokens.size(); i++) {
            final String token = userTokens.get(i);
            final Long emojiId = emojiIds[i % emojiIds.length]; // 1,2,3 번갈아 사용

            Callable<Void> task = () -> {
                try {
                    addEmoji(token, diaryId, emojiId);
                } catch (Exception e) {
                    System.err.println("🚨 이모지 추가 실패: " + e.getMessage());
                    e.printStackTrace();
                }
                return null;
            };

            futures.add(executorService.submit(task));
        }

        for (Future<Void> future : futures) {
            future.get(); // 모든 요청 완료 대기
        }

        Instant end = Instant.now();
        System.out.println("✅ 전체 테스트 실행 시간: " + Duration.between(start, end).toMillis() + "ms");
    }

    void addEmoji(String token, Long diaryId, Long emojiId) {
        System.out.println("🟢 이모지 추가 요청 - token: " + token + " | diaryId: " + diaryId + " | emojiId: " + emojiId);

        ApiResponse<Void> response = restClient.post()
                .uri("/api/v1/feeds/{diaryId}/emojis/{emojiId}", diaryId, emojiId)
                .headers(headers -> headers.set(HttpHeaders.AUTHORIZATION, token)) // ✅ 토큰 추가
                .contentType(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<Void>>() {});

        assertThat(response).isNotNull();
        System.out.println("✅ 이모지 추가 완료: diaryId=" + diaryId + ", emojiId=" + emojiId);
    }

    private String loginAndGetToken(String userId) {
        ApiResponse<LoginResponse> response = restClient.post()
                .uri("/api/v1/login")
                .body(new LoginRequest(userId, "IlzpOxpFRR!5pk%hVOq")) // ✅ 유저별 로그인 요청
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<LoginResponse>>() {});

        System.out.println("🔹 로그인 성공: userId=" + userId + ", 토큰=" + response.getData().getAccessToken());

        return "Bearer " + response.getData().getAccessToken();
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