package com.specup.mongeul.domain.user.service;

import com.specup.mongeul.domain.user.client.KakaoClient;
import com.specup.mongeul.domain.user.dto.oauth.KakaoUserInfo;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.auth.JwtTokenProvider;
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

    public KakaoLoginUrlResponse getKakaoLoginUrl() {
        String url = kakaoClient.getLoginUrl();
        return KakaoLoginUrlResponse.builder()
                .loginUrl(url)
                .build();
    }

    @Transactional
    public LoginResponse kakaoLogin(KakaoLoginRequest request) {
        log.info("카카오 로그인 시작 - 인증 코드: {}", request.getKakaoToken());

        // 인증 코드로 액세스 토큰 발급
        String accessToken = kakaoClient.getAccessToken(request.getKakaoToken());
        log.info("카카오 액세스 토큰 발급 성공: {}", accessToken);

        // 액세스 토큰으로 사용자 정보 조회
        KakaoUserInfo kakaoUserInfo = kakaoClient.getUserInfo(accessToken);
        log.info("카카오 사용자 정보 조회 성공: id={}, email={}",
                kakaoUserInfo.getId(),
                kakaoUserInfo.getEmail());

        User user = userRepository.findByOauthIdAndOauthProvider(
                kakaoUserInfo.getId(),
                OAuthProvider.KAKAO
        ).orElseGet(() -> {
            log.info("신규 사용자 생성 시작");
            User newUser = createKakaoUser(kakaoUserInfo);
            log.info("신규 사용자 생성 완료: id={}", newUser.getId());
            return newUser;
        });

        // 내부 JWT 토큰 발급
        String jwtAccessToken = jwtTokenProvider.createAccessToken(user.getId());
        String jwtRefreshToken = jwtTokenProvider.createRefreshToken(user.getId());
        log.info("JWT 토큰 발급 완료: userId={}", user.getId());

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
        log.info("신규 카카오 사용자 정보 생성 시작");
        User user = User.builder()
                .nickname(null)
                .email(kakaoUserInfo.getEmail())
                .oauthProvider(OAuthProvider.KAKAO)
                .oauthId(kakaoUserInfo.getId())
                .build();

        User savedUser = userRepository.save(user);
        log.info("신규 카카오 사용자 저장 완료: id={}", savedUser.getId());
        return savedUser;
    }
}
