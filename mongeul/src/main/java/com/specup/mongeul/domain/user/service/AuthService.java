package com.specup.mongeul.domain.user.service;

import com.specup.mongeul.domain.user.client.KakaoClient;
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
        User user = User.builder()
                .nickname(null)
                .email(kakaoUserInfo.getEmail())
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
}