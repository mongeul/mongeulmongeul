package com.specup.mongeul.domain.notification.controller;

import com.specup.mongeul.domain.notification.dto.NotificationDTO;
import com.specup.mongeul.domain.notification.dto.response.NotificationResponse;
import com.specup.mongeul.domain.notification.service.NotificationService;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
}