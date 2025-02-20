package mongeul.user;

import com.specup.mongeul.global.common.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("대량 회원가입 테스트")
public class UserBatchSignupTest {
    RestClient restClient;
    List<String> userIds = new ArrayList<>();

    @BeforeEach
    void setUp() {
        restClient = RestClient.create("http://localhost:8080");
    }

    @Test
    @DisplayName("100명의 사용자 회원가입 테스트")
    void batchUserSignupTest() throws InterruptedException, ExecutionException {
        int totalUsers = 100;
        ExecutorService executorService = Executors.newFixedThreadPool(10);
        List<Future<Void>> futures = new ArrayList<>();

        // 🕒 실행 시간 측정 시작
        Instant start = Instant.now();

        for (int i = 1; i <= totalUsers; i++) {
            final String userId = "testUser" + i; // ✅ UUID 대신 testUser1~100 형식으로 userId 생성
            userIds.add(userId);

            Callable<Void> task = () -> {
                try {
                    registerUser(userId);
                } catch (Exception e) {
                    System.err.println("🚨 회원가입 실패: " + e.getMessage());
                }
                return null;
            };

            futures.add(executorService.submit(task));
        }

        for (Future<Void> future : futures) {
            future.get(); // 모든 요청 완료 대기
        }

        // 🕒 실행 시간 측정 종료
        Instant end = Instant.now();
        System.out.println("✅ 전체 회원가입 완료: " + totalUsers + "명, 실행 시간: " + Duration.between(start, end).toMillis() + "ms");

        // 🔍 회원가입된 userId 출력
        System.out.println("🔹 회원가입된 userId 목록: " + userIds);
    }

    void registerUser(String userId) {
        UserSignupRequest request = new UserSignupRequest(
                userId,
                "IlzpOxpFRR!5pk%hVOq",
                "Test User",
                userId + "@test.com",
                "73929795",
                "010-1234-5678",
                "https://example.com/profile.jpg",
                new CompanyInfo(
                        "Test Company",
                        "123-45-67890",
                        "CEO Name",
                        "Seoul",
                        "Detail Address",
                        "IT",
                        "Software",
                        userId + "@company.com"
                ),
                true,
                "USER"
        );

        ApiResponse<Void> response = restClient.post()
                .uri("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<Void>>() {});

        assertThat(response).isNotNull();
        System.out.println("✅ 회원가입 성공: userId=" + userId);
    }

    @Getter
    @AllArgsConstructor
    static class UserSignupRequest {
        private String userId;
        private String password;
        private String name;
        private String email;
        private String birthday;
        private String phoneNumber;
        private String profileImage;
        private CompanyInfo companyInfo;
        private boolean marketingAgreed;
        private String role;
    }

    @Getter
    @AllArgsConstructor
    static class CompanyInfo {
        private String companyName;
        private String businessNumber;
        private String representativeName;
        private String address;
        private String addressDetail;
        private String businessType;
        private String businessItem;
        private String email;
    }
}
