package com.specup.mongeul.domain.user.controller;

import com.specup.mongeul.domain.user.dto.request.*;
import com.specup.mongeul.domain.user.dto.response.*;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.service.UserService;
import com.specup.mongeul.global.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Tag(name = "User", description = "사용자 API")
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;

    @Operation(summary = "회원가입", description = "새로운 사용자를 등록합니다.")
    @PostMapping("/users")
    public ResponseEntity<ApiResponse<UserJoinResponse>> join(@RequestBody @Valid UserJoinRequest request) {
        return ResponseEntity.ok(ApiResponse.success(userService.join(request), "회원가입 성공"));
    }

    @Operation(summary = "아이디 중복 확인", description = "아이디 중복 여부를 확인합니다.")
    @GetMapping("/users/check-id/{userId}")
    public ResponseEntity<ApiResponse<Boolean>> checkDuplicateId(@PathVariable String userId) {
        boolean isAvailable = userService.checkDuplicateId(userId);
        String message = isAvailable ?
                "사용 가능한 아이디입니다" :
                "이미 사용 중인 아이디입니다";
        return ResponseEntity.ok(ApiResponse.success(isAvailable, message));
    }

    @Operation(summary = "이메일 중복 확인", description = "이메일 중복 여부를 확인합니다.")
    @GetMapping("/users/check-email/{email}")
    public ResponseEntity<ApiResponse<Boolean>> checkDuplicateEmail(@PathVariable String email) {
        boolean isAvailable = userService.checkDuplicateEmail(email);
        String message = isAvailable ?
                "사용 가능한 이메일입니다" :
                "이미 사용 중인 이메일입니다";
        return ResponseEntity.ok(ApiResponse.success(isAvailable, message));
    }

    @Operation(summary = "로그인", description = "사용자 인증 후 JWT 토큰을 발급합니다.")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody @Valid LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success(userService.login(request), "로그인 성공"));
    }

    @Operation(summary = "로그아웃", description = "사용자 로그아웃을 처리합니다.")
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@RequestHeader("Authorization") String token) {
        userService.logout(token.replace("Bearer ", ""));
        return ResponseEntity.ok(ApiResponse.success(null, "로그아웃 성공"));
    }

    @Operation(summary = "토큰 재발급", description = "리프레시 토큰을 이용해 새로운 액세스 토큰을 발급합니다.")
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<TokenRefreshResponse>> refreshToken(
            @RequestBody @Valid TokenRefreshRequest request) {
        return ResponseEntity.ok(ApiResponse.success(userService.refreshToken(request), "토큰 재발급 성공"));
    }

    @Operation(summary = "회원정보 조회", description = "현재 로그인한 사용자의 회원정보를 조회합니다.")
    @GetMapping("/users/me")
    public ResponseEntity<ApiResponse<UserUpdateResponse>> getMyInfo(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(
                userService.getMyInfo(user),
                "회원정보 조회 성공"
        ));
    }

    @Operation(summary = "회원정보 수정", description = "현재 로그인한 사용자의 회원정보를 수정합니다.")
    @PutMapping("/users/me")
    public ResponseEntity<ApiResponse<UserUpdateResponse>> updateMyInfo(
            @RequestBody @Valid UserUpdateRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(
                userService.updateMyInfo(request, user),
                "회원정보 수정 성공"
        ));
    }

    @Operation(summary = "비밀번호 재설정", description = "새로운 비밀번호로 재설정합니다.")
    @PostMapping("/users/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(
            @RequestBody @Valid ResetPasswordRequest request) {
        userService.resetPassword(request);
        return ResponseEntity.ok(ApiResponse.success(
                null,
                "비밀번호 재설정 성공"
        ));
    }

    @Operation(summary = "테스트용", description = "테스트 예시입니다.")
    @PostMapping("/users/test")
    public ResponseEntity<ApiResponse<TestResponse>> test(
            @RequestBody @Valid TestRequest request) {
        return ResponseEntity.ok(ApiResponse.success(userService.test(request),
                "회원정보 수정 성공"));
    }
}