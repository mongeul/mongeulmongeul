package com.specup.mongeul.domain.user.client;

import com.specup.mongeul.domain.user.dto.oauth.NaverUserInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
@RequiredArgsConstructor
public class NaverClient {
    private final RestTemplate restTemplate;

    @Value("${oauth.naver.client-id}")
    private String clientId;

    @Value("${oauth.naver.client-secret}")
    private String clientSecret;

    @Value("${oauth.naver.redirect-uri}")
    private String redirectUri;

    /**
     * 네이버 로그인 URL을 생성합니다.
     * @param state 상태값 (CSRF 방지)
     * @return 네이버 로그인 URL
     */
    public String getLoginUrl(String state) {
        return "https://nid.naver.com/oauth2.0/authorize" +
                "?client_id=" + clientId +
                "&redirect_uri=" + redirectUri +
                "&response_type=code" +
                "&state=" + state +
                "&auth_type=reauthenticate";
    }

    /**
     * 인가 코드를 통해 액세스 토큰을 얻습니다.
     * @param authorizationCode 인가 코드
     * @param state 상태값 (CSRF 방지)
     * @return 액세스 토큰
     */
    public String getAccessToken(String authorizationCode, String state) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("code", authorizationCode);
        params.add("state", state);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<NaverTokenResponse> response = restTemplate.postForEntity(
                    "https://nid.naver.com/oauth2.0/token",
                    request,
                    NaverTokenResponse.class
            );

            if (response.getBody() == null) {
                throw new RuntimeException("네이버 토큰 응답이 없습니다.");
            }

            return response.getBody().getAccess_token();
        } catch (Exception e) {
            log.error("네이버 토큰 발급 실패: {}", e.getMessage());
            throw new RuntimeException("네이버 토큰 발급 실패", e);
        }
    }

    /**
    * 액세스 토큰을 통해 사용자 정보를 가져옵니다.
    * @param accessToken 액세스 토큰
    * @return 사용자 정보
    */
    public NaverUserInfo getUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

       HttpEntity<Void> request = new HttpEntity<>(headers);

        try {
            ResponseEntity<NaverUserInfoResponse> response = restTemplate.exchange(
                "https://openapi.naver.com/v1/nid/me",
                    HttpMethod.GET,
                    request,
                    NaverUserInfoResponse.class
            );

            NaverUserInfoResponse userInfoResponse = response.getBody();
            if (userInfoResponse == null || userInfoResponse.getResponse() == null) {
                throw new RuntimeException("네이버 사용자 정보 응답이 없습니다.");
            }

            NaverUserInfoResponse.Response naverResponse = userInfoResponse.getResponse();
            return NaverUserInfo.builder()
                    .id(naverResponse.getId())
                    .email(naverResponse.getEmail())
                    .name(naverResponse.getName())
                    .nickname(naverResponse.getNickname())
                    .profileImage(naverResponse.getProfile_image())
                    .build();
        } catch (Exception e) {
            log.error("네이버 사용자 정보 조회 실패: {}", e.getMessage());
            throw new RuntimeException("네이버 사용자 정보 조회 실패", e);
        }
    }

    @Getter
    @NoArgsConstructor
    public static class NaverTokenResponse {
        private String access_token;
        private String refresh_token;
        private String token_type;
        private Integer expires_in;
    }

    @Getter
    @NoArgsConstructor
    public static class NaverUserInfoResponse {
        private String resultcode;
        private String message;
        private Response response;

        @Getter
        @NoArgsConstructor
        public static class Response {
            private String id;
            private String nickname;
            private String name;
            private String email;
            private String gender;
            private String age;
            private String birthday;
            private String profile_image;
        }
    }
}