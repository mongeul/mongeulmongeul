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
}
