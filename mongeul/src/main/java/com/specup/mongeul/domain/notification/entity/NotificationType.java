package com.specup.mongeul.domain.notification.entity;

import lombok.Getter;

@Getter
public enum NotificationType {
    COMMENT("누군가 내 일기에 댓글을 남겼어요."),
    REACTION("누군가 내 일기에 공감해줬어요."),
    FRIEND_REQUEST("공유 일기가 도착했어요.");

    private final String message;

    NotificationType(String message) {
        this.message = message;
    }

}