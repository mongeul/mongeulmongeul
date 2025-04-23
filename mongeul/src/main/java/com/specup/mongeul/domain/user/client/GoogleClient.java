package com.specup.mongeul.domain.user.client;

import com.specup.mongeul.domain.user.dto.oauth.GoogleUserInfo;
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
public class GoogleClient {
    private final RestTemplate restTemplate;

    @Value("${oauth.google.client-id}")
    private String clientId;

    @Value("${oauth.google.client-secret}")
    private String clientSecret;

    @Value("${oauth.google.redirect-uri}")
    private String redirectUri;

    /**
     * 구글 로그인 URL을 생성합니다.
     * @return 구글 로그인 URL
     */
    public String getLoginUrl() {
        return "https://accounts.google.com/o/oauth2/v2/auth" +
                "?client_id=" + clientId +
                "&redirect_uri=" + redirectUri +
                "&response_type=code" +
                "&scope=email profile";
    }

    /**
     * 인가 코드를 통해 액세스 토큰을 얻습니다.
     * @param authorizationCode 인가 코드
     * @return 액세스 토큰
     */
    public String getAccessToken(String authorizationCode) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<GoogleTokenResponse> response = restTemplate.postForEntity(
                    "https://oauth2.googleapis.com/token",
                    request,
                    GoogleTokenResponse.class
            );

            if (response.getBody() == null) {
                throw new RuntimeException("구글 토큰 응답이 없습니다.");
            }

            return response.getBody().getAccess_token();
        } catch (Exception e) {
            log.error("구글 토큰 발급 실패: {}", e.getMessage());
            throw new RuntimeException("구글 토큰 발급 실패", e);
        }
    }

    /**
     * 액세스 토큰을 통해 사용자 정보를 가져옵니다.
     * @param accessToken 액세스 토큰
     * @return 사용자 정보
     */
    public GoogleUserInfo getUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        try {
            ResponseEntity<GoogleUserInfoResponse> response = restTemplate.exchange(
                    "https://www.googleapis.com/oauth2/v2/userinfo",
                    HttpMethod.GET,
                    request,
                    GoogleUserInfoResponse.class
            );

            GoogleUserInfoResponse userInfoResponse = response.getBody();
            if (userInfoResponse == null) {
                throw new RuntimeException("구글 사용자 정보 응답이 없습니다.");
            }

            return GoogleUserInfo.builder()
                    .id(userInfoResponse.getId())
                    .email(userInfoResponse.getEmail())
                    .name(userInfoResponse.getName())
                    .picture(userInfoResponse.getPicture())
                    .build();
        } catch (Exception e) {
            log.error("구글 사용자 정보 조회 실패: {}", e.getMessage());
            throw new RuntimeException("구글 사용자 정보 조회 실패", e);
        }
    }

    @Getter
    @NoArgsConstructor
    public static class GoogleTokenResponse {
        private String access_token;
        private String token_type;
        private String refresh_token;
        private Integer expires_in;
        private String id_token;
    }

    @Getter
    @NoArgsConstructor
    public static class GoogleUserInfoResponse {
        private String id;
        private String email;
        private boolean verified_email;
        private String name;
        private String given_name;
        private String family_name;
        private String picture;
        private String locale;
    }
}