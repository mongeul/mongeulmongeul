package com.specup.mongeul.domain.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.specup.mongeul.global.common.ApiResponse;
import com.specup.mongeul.domain.user.dto.request.*;
import com.specup.mongeul.domain.user.dto.response.*;
import com.specup.mongeul.domain.user.service.*;
import com.specup.mongeul.domain.user.entity.User;

@Tag(name = "Auth", description = "인증 API")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Validated
public class AuthController {
    private final AuthService authService;

    @Operation(summary = "카카오 로그인 URL", description = "카카오 로그인 URL을 반환합니다.")
    @GetMapping("/kakao")
    public ResponseEntity<ApiResponse<KakaoLoginUrlResponse>> getKakaoLoginUrl() {
        return ResponseEntity.ok(ApiResponse.success(authService.getKakaoLoginUrl(), "카카오 로그인 URL 생성 성공"));
    }

    @Operation(summary = "카카오 로그인", description = "카카오 토큰으로 로그인을 처리합니다.")
    @PostMapping("/kakao")
    public ResponseEntity<ApiResponse<LoginResponse>> kakaoLogin(
            @RequestBody @Valid KakaoLoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.kakaoLogin(request), "로그인 성공"));
    }

    @Operation(summary = "토큰 재발급", description = "리프레시 토큰으로 액세스 토큰과 리프레시 토큰을 재발급합니다.")
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<TokenRefreshResponse>> refreshToken(
            @RequestBody @Valid TokenRefreshRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(authService.refreshToken(request), "토큰 재발급 성공"));
    }

    @Operation(summary = "로그아웃", description = "사용자의 로그아웃을 처리합니다.")
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            @RequestBody @Valid LogoutRequest request,
            @AuthenticationPrincipal User user) {
        authService.logout(request, user.getId());
        return ResponseEntity.ok(ApiResponse.success(null, "로그아웃 성공"));
    }

    @Operation(summary = "구글 로그인 URL", description = "구글 로그인 URL을 반환합니다.")
    @GetMapping("/google")
    public ResponseEntity<ApiResponse<GoogleLoginUrlResponse>> getGoogleLoginUrl() {
        return ResponseEntity.ok(ApiResponse.success(authService.getGoogleLoginUrl(), "구글 로그인 URL 생성 성공"));
    }

    @Operation(summary = "구글 로그인", description = "구글 인증 코드로 로그인합니다.")
    @PostMapping("/google")
    public ResponseEntity<ApiResponse<LoginResponse>> googleLogin(
            @RequestBody @Valid GoogleLoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.googleLogin(request), "구글 로그인 성공"));
    }

    @Operation(summary = "네이버 로그인 URL", description = "네이버 로그인 URL을 반환합니다.")
    @GetMapping("/naver")
    public ResponseEntity<ApiResponse<NaverLoginUrlResponse>> getNaverLoginUrl() {
        return ResponseEntity.ok(ApiResponse.success(authService.getNaverLoginUrl(), "네이버 로그인 URL 생성 성공"));
    }

    @Operation(summary = "네이버 로그인", description = "네이버 인증 코드로 로그인합니다.")
    @PostMapping("/naver")
    public ResponseEntity<ApiResponse<LoginResponse>> naverLogin(
            @RequestBody @Valid NaverLoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.naverLogin(request), "네이버 로그인 성공"));
    }
}
