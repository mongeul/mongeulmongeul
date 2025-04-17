package com.specup.mongeul.domain.notification.controller;

import com.specup.mongeul.domain.notification.dto.NotificationDTO;
import com.specup.mongeul.domain.notification.dto.request.DeviceTokenRequest;
import com.specup.mongeul.domain.notification.dto.response.NotificationResponse;
import com.specup.mongeul.domain.notification.service.NotificationService;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Notifications", description = "알림 API")
@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @Operation(summary = "알림 목록 조회", description = "사용자의 알림 목록을 조회합니다.")
    @GetMapping("")
    public ResponseEntity<ApiResponse<NotificationResponse>> getNotifications(@AuthenticationPrincipal User user) {
        List<NotificationDTO> notifications = notificationService.getNotifications(user);
        NotificationResponse response = NotificationResponse.builder()
                .content(notifications)
                .build();

        return ResponseEntity.ok(ApiResponse.success(response, "알림 목록 조회"));
    }

    @Operation(summary = "알림 읽음 처리", description = "특정 알림을 읽음 처리합니다.")
    @PatchMapping("/{notificationId}/read")
    public ResponseEntity<ApiResponse<Void>> markAsRead(
            @AuthenticationPrincipal User user,
            @PathVariable Long notificationId) {
        notificationService.markNotificationAsRead(user, notificationId);
        return ResponseEntity.ok(ApiResponse.success(null, "알림 읽음 처리 성공"));
    }
    
    @Operation(summary = "모든 알림 읽음 처리", description = "사용자의 모든 알림을 읽음 처리합니다.")
    @PatchMapping("/read-all")
    public ResponseEntity<ApiResponse<Void>> markAllAsRead(@AuthenticationPrincipal User user) {
        notificationService.markAllAsRead(user.getId());
        return ResponseEntity.ok(ApiResponse.success(null, "모든 알림 읽음 처리 성공"));
    }
    
    @Operation(summary = "읽지 않은 알림 개수 조회", description = "사용자의 읽지 않은 알림 개수를 조회합니다.")
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Long>> countUnreadNotifications(@AuthenticationPrincipal User user) {
        long count = notificationService.countUnreadNotifications(user);
        return ResponseEntity.ok(ApiResponse.success(count, "읽지 않은 알림 개수 조회 성공"));
    }
    
    @Operation(summary = "기기 토큰 등록", description = "푸시 알림을 위한 기기 토큰을 등록합니다.")
    @PostMapping("/token")
    public ResponseEntity<ApiResponse<Void>> registerDeviceToken(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody DeviceTokenRequest request) {
        notificationService.registerDeviceToken(user, request);
        return ResponseEntity.ok(ApiResponse.success(null, "기기 토큰 등록 성공"));
    }
    
    @Operation(summary = "기기 토큰 등록 해제", description = "푸시 알림을 위한 기기 토큰을 등록 해제합니다.")
    @DeleteMapping("/token")
    public ResponseEntity<ApiResponse<Void>> unregisterDeviceToken(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody DeviceTokenRequest request) {
        notificationService.unregisterDeviceToken(user, request);
        return ResponseEntity.ok(ApiResponse.success(null, "기기 토큰 등록 해제 성공"));
    }


    @Operation(summary = "테스트용 댓글 알림 발송", description = "특정 사용자에게 댓글 알림을 테스트로 발송합니다.")
    @PostMapping("/test/comment")
    public ResponseEntity<ApiResponse<String>> sendTestCommentNotification(
            @AuthenticationPrincipal User user,
            @RequestParam String commentContent,
            @RequestParam Long diaryId) {
        String result = notificationService.sendCommentNotification(user, commentContent, diaryId);
        return ResponseEntity.ok(ApiResponse.success(result, "테스트 댓글 알림 발송 성공"));
    }

    @Operation(summary = "테스트용 이모지 알림 발송", description = "특정 사용자에게 이모지 알림을 테스트로 발송합니다.")
    @PostMapping("/test/emoji")
    public ResponseEntity<ApiResponse<String>> sendTestEmojiNotification(
            @AuthenticationPrincipal User user,
            @RequestParam String emojiName,
            @RequestParam Long diaryId) {
        String result = notificationService.sendEmojiNotification(user, emojiName, diaryId);
        return ResponseEntity.ok(ApiResponse.success(result, "테스트 이모지 알림 발송 성공"));
    }

    @Operation(summary = "테스트용 공유 일기 알림 발송", description = "특정 사용자에게 공유 일기 알림을 테스트로 발송합니다.")
    @PostMapping("/test/share-diary")
    public ResponseEntity<ApiResponse<String>> sendTestShareDiaryNotification(
            @AuthenticationPrincipal User user,
            @RequestParam String diaryTitle,
            @RequestParam Long shareDiaryId) {
        String result = notificationService.sendShareDiaryNotification(user, diaryTitle, shareDiaryId);
        return ResponseEntity.ok(ApiResponse.success(result, "테스트 공유 일기 알림 발송 성공"));
    }

    @Operation(summary = "테스트용 모든 사용자에게 알림 발송", description = "모든 사용자에게 테스트 알림을 발송합니다.")
    @PostMapping("/test/broadcast")
    public ResponseEntity<ApiResponse<String>> sendTestBroadcastNotification(
            @AuthenticationPrincipal User user,
            @RequestParam String title,
            @RequestParam String body) {
        String result = notificationService.sendBroadcastNotification(user, title, body);
        return ResponseEntity.ok(ApiResponse.success(result, "테스트 브로드캐스트 알림 발송 성공"));
    }
}