package com.specup.mongeul.domain.user.service;

import com.specup.mongeul.domain.user.client.KakaoClient;
import com.specup.mongeul.domain.user.dto.oauth.KakaoUserInfo;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.auth.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.specup.mongeul.domain.user.entity.*;
import com.specup.mongeul.domain.user.repository.*;
import com.specup.mongeul.domain.user.dto.request.*;
import com.specup.mongeul.domain.user.dto.response.*;

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
        // 인증 코드로 액세스 토큰 발급
        String accessToken = kakaoClient.getAccessToken(request.getKakaoToken());

        // 액세스 토큰으로 사용자 정보 조회
        KakaoUserInfo kakaoUserInfo = kakaoClient.getUserInfo(accessToken);

        User user = userRepository.findByOauthIdAndOauthProvider(
                kakaoUserInfo.getId(),
                OAuthProvider.KAKAO
        ).orElseGet(() -> createKakaoUser(kakaoUserInfo));

        // 내부 JWT 토큰 발급
        String jwtAccessToken = jwtTokenProvider.createAccessToken(user.getId());
        String jwtRefreshToken = jwtTokenProvider.createRefreshToken(user.getId());

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
                .nickname(kakaoUserInfo.getNickname())
                .email(kakaoUserInfo.getEmail())
                .oauthProvider(OAuthProvider.KAKAO)
                .oauthId(kakaoUserInfo.getId())
                .build();

        return userRepository.save(user);
    }
}
