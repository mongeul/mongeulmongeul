package mongeul.comment.api;

import com.specup.mongeul.domain.comment.dto.response.CommentResponse;
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

import java.util.List;

public class CommentApiTest {
    RestClient restClient;
    String token;

    @BeforeEach
    public void setUp() {
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
     * 댓글 생성 테스트
     */
    @Test
    void createTest() {
        CommentResponse response = create(token, 2L, new CommentRequest(
                "생성된 댓글입니다."
        ));
        System.out.println("response: " + response);
    }

    CommentResponse create(String token, Long diaryId, CommentRequest request) {
        ApiResponse<CommentResponse> apiResponse = restClient.post()
                .uri("/api/v1/diaries/{diaryId}/comments", diaryId)
                .headers(headers -> headers.set(HttpHeaders.AUTHORIZATION, token))
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<CommentResponse>>() {});
        return apiResponse.getData();
    }

    /**
     * 댓글 조회 테스트
     */
    @Test
    void readTest() {
        List<CommentResponse> response = read(2L);
        System.out.println("response: " + response);
    }

    List<CommentResponse> read(Long diaryId) {
        ApiResponse<List<CommentResponse>> apiResponse = restClient.get()
                .uri("/api/v1/comments/{diaryId}", diaryId)
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<List<CommentResponse>>>() {});
        return apiResponse.getData();
    }

    /**
     * 댓글 수정 테스트
     */
    @Test
    void updateTest() {
        CommentResponse response = update(token, 2L, new CommentRequest(
                "수정된 댓글입니다."
        ));
        System.out.println("response: " + response);
    }

    CommentResponse update(String token, Long commentId, CommentRequest request) {
        ApiResponse<CommentResponse> apiResponse = restClient.put()
                .uri("/api/v1/comments/{commentId}", commentId)
                .headers(headers -> headers.set(HttpHeaders.AUTHORIZATION, token))
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(new ParameterizedTypeReference<ApiResponse<CommentResponse>>() {});
        return apiResponse.getData();
    }

    /**
     * 댓글 삭제 테스트
     */
    @Test
    void deleteTest() {
        delete(token, 2L);
        System.out.println("댓글 삭제 완료");
    }

    void delete(String token, Long commentId) {
        restClient.delete()
                .uri("/api/v1/comments/{commentId}", commentId)
                .headers(headers -> headers.set(HttpHeaders.AUTHORIZATION, token))
                .retrieve()
                .toBodilessEntity();
    }

    @Getter
    @AllArgsConstructor
    static class CommentRequest {
        private String content;
    }

    @Getter
    @AllArgsConstructor
    static class LoginRequest {
        private String userId;
        private String password;
    }
}
