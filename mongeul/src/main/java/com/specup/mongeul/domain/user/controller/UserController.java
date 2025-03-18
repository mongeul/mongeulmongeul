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

@Tag(name = "User", description = "사용자 API")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;

    @Operation(summary = "닉네임 설정", description = "사용자의 닉네임을 설정합니다.")
    @PostMapping("/nickname")
    public ResponseEntity<ApiResponse<NicknameResponse>> setNickname(
            @RequestBody @Valid NicknameRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(userService.setNickname(request, user), "닉네임 설정 성공"));
    }

    @Operation(summary = "회원정보 조회", description = "현재 로그인한 사용자의 회원정보를 조회합니다.")
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getMyInfo(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(userService.getMyInfo(user), "개인정보 조회 성공"));
    }

    @Operation(summary = "회원 탈퇴", description = "회원 탈퇴를 처리합니다.")
    @PostMapping("/withdraw")
    public ResponseEntity<ApiResponse<Void>> withdraw(
            @AuthenticationPrincipal User user) {
        userService.withdraw(user);
        return ResponseEntity.ok(ApiResponse.success(null, "회원탈퇴 성공"));
    }

    @Operation(summary = "잠금 비밀번호 설정", description = "잠금 비밀번호를 설정합니다.")
    @PostMapping("/password")
    public ResponseEntity<ApiResponse<Void>> setLockPassword(
            @RequestBody @Valid LockPasswordRequest request,
            @AuthenticationPrincipal User user) {
        userService.setLockPassword(request, user);
        return ResponseEntity.ok(ApiResponse.success(null, "잠금 비밀번호 설정 성공"));
    }
}