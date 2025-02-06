package mongeul.diary.api;

import com.specup.mongeul.domain.diary.dto.response.DiaryResponse;
import com.specup.mongeul.domain.diary.entity.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.DiaryWeather;
import com.specup.mongeul.global.common.ApiResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.junit.jupiter.api.Test;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.client.RestClient;

public class DiaryApiTest {
    RestClient restClient = RestClient.create("http://localhost:8080");

    // Create
    @Test
    void createTest() {
        DiaryResponse response = create(new DiaryCreateRequest(
                "하이로",
                "하이루하이루",
                false,
                null,
                DiaryWeather.SUNNY,
                DiaryFeeling.HAPPY,
                DiaryPrivate.PUBLIC
        ));
        System.out.println("response = " + response);
    }

    DiaryResponse create(DiaryCreateRequest request) {
            ApiResponse<DiaryResponse> apiResponse = restClient.post()
                .uri("/api/v1/diaries")
                .body(request)
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<DiaryResponse>>() {});
            return apiResponse.getData();
    }

    // Read
    @Test
    void readTest() {
        DiaryResponse response = read(12L);
        System.out.println("response = " + response);
    }

    DiaryResponse read(Long diaryId) {
        ApiResponse<DiaryResponse> apiResponse = restClient.get()
                .uri("/api/v1/diaries/{diaryId}", diaryId)
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<DiaryResponse>>() {});
        return apiResponse.getData();
    }

    // Update
    @Test
    void updateTest() {
        DiaryResponse response = update(12L, new DiaryUpdateRequest(
                "수정본",
                "수정수정",
                true,
                null,
                DiaryWeather.RAINY,
                DiaryFeeling.ANGRY,
                DiaryPrivate.PUBLIC
        ));
        System.out.println("response = " + response);
    }

    DiaryResponse update(Long diaryId, DiaryUpdateRequest request) {
        ApiResponse<DiaryResponse> apiResponse = restClient.put()
                .uri("/api/v1/diaries/{diaryId}", diaryId)
                .body(request)
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<DiaryResponse>>() {});
        return apiResponse.getData();
    }

    // delete
    @Test
    void deleteTest() {
        delete(12L);
        System.out.println("삭제 완료");
    }

    void delete(Long diaryId) {
        restClient.delete()
                .uri("/api/v1/diaries/{diaryId}", diaryId)
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
}
