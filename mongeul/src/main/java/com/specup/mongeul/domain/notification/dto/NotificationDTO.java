package com.specup.mongeul.domain.notification.dto;

import com.specup.mongeul.domain.notification.entity.Notification;
import com.specup.mongeul.domain.notification.entity.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private Long notificationId;
    private String title;
    private String content;
    private NotificationType type;
    private LocalDateTime createdAt;
    private Long diaryId;
    private Long sharedDiaryId;
    private boolean isRead;

    public static NotificationDTO from(Notification notification) {
        return NotificationDTO.builder()
                .notificationId(notification.getId())
                .title(notification.getTitle())
                .content(notification.getContent().getMessage())
                .type(notification.getContent())
                .createdAt(notification.getCreatedAt())
                .diaryId(notification.getDiaryId())
                .sharedDiaryId(notification.getSharedDiaryId())
                .isRead(notification.getIsRead())
                .build();
    }
}