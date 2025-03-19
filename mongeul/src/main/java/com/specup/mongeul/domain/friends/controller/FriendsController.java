package com.specup.mongeul.domain.friends.controller;

import com.specup.mongeul.domain.friends.dto.response.FriendCodeResponse;
import com.specup.mongeul.domain.friends.dto.response.FriendNicknameResponse;
import com.specup.mongeul.domain.friends.dto.response.FriendResponse;
import com.specup.mongeul.domain.friends.dto.response.WritableShareFriendResponse;
import com.specup.mongeul.domain.friends.service.FriendService;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Friends", description = "친구 API")
@RestController
@RequestMapping("/api/v1/friend")
@RequiredArgsConstructor
public class FriendsController {
    private final FriendService friendService;

    @Operation(summary = "친구 목록 조회", description = "친구 목록을 조회합니다.")
    @GetMapping("")
    public ResponseEntity<ApiResponse<List<FriendResponse>>> getFriends(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(friendService.getFriends(user), "친구 목록 조회 성공"));
    }

    @Operation(summary = "공유일기 작성 가능한 친구 목록 조회", description = "현재 공유일기를 작성할 수 있는 친구 목록을 조회합니다.")
    @GetMapping("/writable")
    public ResponseEntity<ApiResponse<List<WritableShareFriendResponse>>> getWritableShareFriends(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(friendService.getWritableShareFriends(user), "공유일기 작성 가능한 친구 목록 조회 성공"));
    }

    @Operation(summary = "친구 코드 발급", description = "친구 추가용 코드를 발급합니다.")
    @GetMapping("/code")
    public ResponseEntity<ApiResponse<FriendCodeResponse>> generateFriendCode(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(friendService.generateFriendCode(user), "친구용 코드 발급 성공"));
    }

    @Operation(summary = "친구 조회", description = "친구 코드로 친구를 조회합니다.")
    @GetMapping("/{code}")
    public ResponseEntity<ApiResponse<FriendNicknameResponse>> searchFriend(@AuthenticationPrincipal User user, @PathVariable String code) {
        return ResponseEntity.ok(ApiResponse.success(friendService.searchFriend(user, code), "친구 조회 성공"));
    }

    @Operation(summary = "친구 추가", description = "친구 코드로 친구를 추가합니다.")
    @PostMapping("")
    public ResponseEntity<ApiResponse<FriendNicknameResponse>> addFriend(
            @AuthenticationPrincipal User user,
            @RequestParam String code) {
        return ResponseEntity.ok(ApiResponse.success(friendService.addFriend(user, code), "친구 추가 성공"));
    }

    @Operation(summary = "친구 삭제", description = "친구 ID로 친구 관계의 상태를 업데이트합니다.")
    @DeleteMapping("/{friendId}")
    public ResponseEntity<ApiResponse<Void>> deleteFriend(
            @AuthenticationPrincipal User user,
            @PathVariable Long friendId) {
        friendService.deleteFriend(user, friendId);
        return ResponseEntity.ok(ApiResponse.success(null, "친구 삭제 성공"));
    }

}