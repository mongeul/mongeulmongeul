package mongeul.diary.api;

import com.specup.mongeul.domain.diary.dto.response.DiaryResponse;
import com.specup.mongeul.domain.diary.entity.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.DiaryWeather;
import com.specup.mongeul.domain.user.dto.request.LoginRequest;
import com.specup.mongeul.domain.user.dto.response.LoginResponse;
import com.specup.mongeul.global.common.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;

public class DiaryApiTest {
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

    /**
     * 일기 생성 테스트
     */
    @Test
    void createTest() {
        DiaryResponse response = create(token, new DiaryCreateRequest(
                "일기 생성",
                "일기가 생성되었습니다.",
                false,
                null,
                DiaryWeather.SUNNY,
                DiaryFeeling.HAPPY,
                DiaryPrivate.PUBLIC
        ));
        System.out.println("response = " + response);
    }

    DiaryResponse create(String token, DiaryCreateRequest request) {
            ApiResponse<DiaryResponse> apiResponse = restClient.post()
                .uri("/api/v1/diaries")
                    .headers(headers -> headers.set(HttpHeaders.AUTHORIZATION, token))
                    .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<DiaryResponse>>() {});
            return apiResponse.getData();
    }

    /**
     * 일기 조회 테스트
     */
    @Test
    void readTest() {
        DiaryResponse response = read(2L);
        System.out.println("response = " + response);
    }

    DiaryResponse read(Long diaryId) {
        ApiResponse<DiaryResponse> apiResponse = restClient.get()
                .uri("/api/v1/diaries/{diaryId}", diaryId)
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<DiaryResponse>>() {});
        return apiResponse.getData();
    }

    /**
     * 일기 수정 테스트
     */
    @Test
    void updateTest() {
        DiaryResponse response = update(token, 1L, new DiaryUpdateRequest(
                "일기 수정",
                "일기가 수정되었습니다.",
                true,
                null,
                DiaryWeather.RAINY,
                DiaryFeeling.ANGRY,
                DiaryPrivate.PUBLIC
        ));
        System.out.println("response = " + response);
    }

    DiaryResponse update(String token, Long diaryId, DiaryUpdateRequest request) {
        ApiResponse<DiaryResponse> apiResponse = restClient.put()
                .uri("/api/v1/diaries/{diaryId}", diaryId)
                .headers(headers -> headers.set(HttpHeaders.AUTHORIZATION, token))
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<DiaryResponse>>() {});
        return apiResponse.getData();
    }

    /**
     * 일기 삭제 테스트
     */
    @Test
    void deleteTest() {
        delete(token, 1L);
        System.out.println("일기 삭제 완료");
    }

    void delete(String token, Long diaryId) {
        restClient.delete()
                .uri("/api/v1/diaries/{diaryId}", diaryId)
                .headers(headers -> headers.set(HttpHeaders.AUTHORIZATION, token))
                .retrieve()
                .toBodilessEntity();
    }

    @Getter
    @AllArgsConstructor
    static class DiaryCreateRequest {
        private String title;
        private String content;
        private boolean isLocked;
        private String picture;
        private DiaryWeather weather;
        private DiaryFeeling feeling;
        private DiaryPrivate isPrivate;
    }

    @Getter
    @AllArgsConstructor
    static class DiaryUpdateRequest {
        private String title;
        private String content;
        private boolean isLocked;
        private String picture;
        private DiaryWeather weather;
        private DiaryFeeling feeling;
        private DiaryPrivate isPrivate;
    }

    @Getter
    @AllArgsConstructor
    static class LoginRequest {
        private String userId;
        private String password;
    }
}
