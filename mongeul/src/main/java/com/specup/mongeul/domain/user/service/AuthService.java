package com.specup.mongeul.domain.user.service;

import com.specup.mongeul.domain.user.client.GoogleClient;
import com.specup.mongeul.domain.user.client.KakaoClient;
import com.specup.mongeul.domain.user.client.NaverClient;
import com.specup.mongeul.domain.user.dto.oauth.GoogleUserInfo;
import com.specup.mongeul.domain.user.dto.oauth.NaverUserInfo;
import com.specup.mongeul.domain.user.dto.oauth.KakaoUserInfo;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.auth.JwtTokenProvider;
import com.specup.mongeul.global.auth.TokenBlacklistService;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.specup.mongeul.domain.user.entity.*;
import com.specup.mongeul.domain.user.repository.*;
import com.specup.mongeul.domain.user.dto.request.*;
import com.specup.mongeul.domain.user.dto.response.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {
    private final UserRepository userRepository;
    private final KakaoClient kakaoClient;
    private final GoogleClient googleClient;
    private final NaverClient naverClient;
    private final JwtTokenProvider jwtTokenProvider;
    private final TokenBlacklistService tokenBlacklistService;

    public KakaoLoginUrlResponse getKakaoLoginUrl() {
        String url = kakaoClient.getLoginUrl();
        return KakaoLoginUrlResponse.builder()
                .loginUrl(url)
                .build();
    }

    @Transactional
    public LoginResponse kakaoLogin(KakaoLoginRequest request) {
        // 인증 코드로 액세스 토큰 발급
        String accessToken = kakaoClient.getAccessToken(request.getKakaoToken());

        // 액세스 토큰으로 사용자 정보 조회
        KakaoUserInfo kakaoUserInfo = kakaoClient.getUserInfo(accessToken);

        // 내부 사용자 조회 또는 생성
        User user = userRepository.findByOauthIdAndOauthProvider(
                kakaoUserInfo.getId(),
                OAuthProvider.KAKAO
        ).orElseGet(() -> createKakaoUser(kakaoUserInfo));

        // 내부 JWT 토큰 발급
        String jwtAccessToken = jwtTokenProvider.createAccessToken(user.getId());
        String jwtRefreshToken = jwtTokenProvider.createRefreshToken(user.getId());

        // 카카오 로그아웃 API 호출 (추가)
        try {
            kakaoClient.logoutUser(accessToken);
        } catch (Exception e) {
            log.error("카카오 로그아웃 실패: {}", e.getMessage());
        }

        // 응답 반환
        return LoginResponse.builder()
                .accessToken(jwtAccessToken)
                .refreshToken(jwtRefreshToken)
                .user(LoginResponse.UserInfo.builder()
                        .id(user.getId())
                        .nickname(user.getNickname())
                        .email(user.getEmail())
                        .build())
                .build();
    }

    private User createKakaoUser(KakaoUserInfo kakaoUserInfo) {
        // 카카오는 닉네임을 제공하지 않을 수 있어 이메일 앞부분을 기본으로 사용
        String nickname = null;
        String email = kakaoUserInfo.getEmail();
        if (email != null && !email.isEmpty()) {
            nickname = email.split("@")[0];
        }
        
        log.info("Creating Kakao user with nickname: {}, email: {}", nickname, email);
        
        User user = User.builder()
                .nickname(nickname)
                .email(email)
                .oauthProvider(OAuthProvider.KAKAO)
                .oauthId(kakaoUserInfo.getId())
                .build();

        return userRepository.save(user);
    }

    @Transactional
    public TokenRefreshResponse refreshToken(TokenRefreshRequest request) {
        // 리프레시 토큰 검증
        if (!jwtTokenProvider.validateToken(request.getRefreshToken())) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 블랙리스트 확인
        if (tokenBlacklistService.isBlacklisted(request.getRefreshToken())) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 리프레시 토큰에서 사용자 ID 추출
        Long userId = jwtTokenProvider.getUserIdFromToken(request.getRefreshToken());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));;

        // 새 토큰 발급
        String newAccessToken = jwtTokenProvider.createAccessToken(user.getId());
        String newRefreshToken = jwtTokenProvider.createRefreshToken(user.getId());

        // 사용한 리프레시 토큰을 블랙리스트에 추가
        tokenBlacklistService.addToBlacklist(request.getAccessToken());
        tokenBlacklistService.addToBlacklist(request.getRefreshToken());

        return TokenRefreshResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    @Transactional
    public void logout(LogoutRequest request, Long userId) {
        // 토큰 블랙리스트에 추가
        if (request.getAccessToken() != null) {
            tokenBlacklistService.addToBlacklist(request.getAccessToken());
        }

        if (request.getRefreshToken() != null) {
            tokenBlacklistService.addToBlacklist(request.getRefreshToken());
        }
    }

    // 구글 로그인 URL 생성
    public GoogleLoginUrlResponse getGoogleLoginUrl() {
        String url = googleClient.getLoginUrl();
        return GoogleLoginUrlResponse.builder()
                .loginUrl(url)
                .build();
    }

    // 구글 로그인 처리
    @Transactional
    public LoginResponse googleLogin(GoogleLoginRequest request) {
        // 인증 코드로 액세스 토큰 발급
        String accessToken = googleClient.getAccessToken(request.getCode());

        // 액세스 토큰으로 사용자 정보 조회
        GoogleUserInfo googleUserInfo = googleClient.getUserInfo(accessToken);

        // 내부 사용자 조회 또는 생성
        User user = userRepository.findByOauthIdAndOauthProvider(
                googleUserInfo.getId(),
                OAuthProvider.GOOGLE
        ).orElseGet(() -> createGoogleUser(googleUserInfo));

        // 내부 JWT 토큰 발급
        String jwtAccessToken = jwtTokenProvider.createAccessToken(user.getId());
        String jwtRefreshToken = jwtTokenProvider.createRefreshToken(user.getId());

        // 응답 반환
        return LoginResponse.builder()
                .accessToken(jwtAccessToken)
                .refreshToken(jwtRefreshToken)
                .user(LoginResponse.UserInfo.builder()
                        .id(user.getId())
                        .nickname(user.getNickname())
                        .email(user.getEmail())
                        .build())
                .build();
    }

    // 구글 사용자 생성
    private User createGoogleUser(GoogleUserInfo googleUserInfo) {
        // 구글은 name을 제공하지만 추가 처리
        String nickname = googleUserInfo.getName();
        if (nickname == null || nickname.isEmpty()) {
            String email = googleUserInfo.getEmail();
            if (email != null && !email.isEmpty()) {
                nickname = email.split("@")[0];
            }
        }
        
        log.info("Creating Google user with nickname: {}, email: {}", nickname, googleUserInfo.getEmail());
        
        User user = User.builder()
                .nickname(nickname)
                .email(googleUserInfo.getEmail())
                .oauthProvider(OAuthProvider.GOOGLE)
                .oauthId(googleUserInfo.getId())
                .build();

        return userRepository.save(user);
    }

    // 네이버 로그인 URL 생성
    public NaverLoginUrlResponse getNaverLoginUrl() {
        // 보안을 위한 state 값 생성 (예: 랜덤 문자열)
        String state = generateRandomState();
        String url = naverClient.getLoginUrl(state);
        return NaverLoginUrlResponse.builder()
                .loginUrl(url)
                .state(state)
                .build();
    }

    // 랜덤 상태값 생성 (CSRF 방지)
    private String generateRandomState() {
        return java.util.UUID.randomUUID().toString();
    }

    // 네이버 로그인 처리
    @Transactional
    public LoginResponse naverLogin(NaverLoginRequest request) {
        // 인증 코드로 액세스 토큰 발급
        String accessToken = naverClient.getAccessToken(request.getCode(), request.getState());

        // 액세스 토큰으로 사용자 정보 조회
        NaverUserInfo naverUserInfo = naverClient.getUserInfo(accessToken);

        // 내부 사용자 조회 또는 생성
        User user = userRepository.findByOauthIdAndOauthProvider(
                naverUserInfo.getId(),
                OAuthProvider.NAVER
        ).orElseGet(() -> createNaverUser(naverUserInfo));

        // 내부 JWT 토큰 발급
        String jwtAccessToken = jwtTokenProvider.createAccessToken(user.getId());
        String jwtRefreshToken = jwtTokenProvider.createRefreshToken(user.getId());

        // 응답 반환
        return LoginResponse.builder()
                .accessToken(jwtAccessToken)
                .refreshToken(jwtRefreshToken)
                .user(LoginResponse.UserInfo.builder()
                        .id(user.getId())
                        .nickname(user.getNickname())
                        .email(user.getEmail())
                        .build())
                .build();
    }

    // 네이버 사용자 생성
    private User createNaverUser(NaverUserInfo naverUserInfo) {
        String nickname = "temp";
        String email = naverUserInfo.getEmail();
        if (email != null && !email.isEmpty()) {
            nickname = email.split("@")[0];
        }
        
        User user = User.builder()
                .nickname(nickname)
                .email(naverUserInfo.getEmail())
                .oauthProvider(OAuthProvider.NAVER)
                .oauthId(naverUserInfo.getId())
                .build();

        return userRepository.save(user);
    }
}