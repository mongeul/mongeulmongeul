package com.specup.mongeul.domain.notification.entity;

import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.BaseSoftDeleteEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE notification SET deleted = true, deleted_at = CURRENT_TIME WHERE id = ?")
@Table(name = "notification")
@SQLRestriction("deleted = false")
public class Notification extends BaseSoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private NotificationType content;

    @Column(nullable = false)
    private Boolean isRead = false;

    // 연관된 다이어리 아이디 (선택적)
    @Column(name = "diary_id")
    private Long diaryId;

    // 연관된 공유 일기 아이디 (선택적)
    @Column(name = "shared_diary_id")
    private Long sharedDiaryId;

    public static Notification create(User user, String title, NotificationType content, Long diaryId, Long sharedDiaryId) {
        Notification notification = new Notification();
        notification.user = user;
        notification.title = title;
        notification.content = content;
        notification.diaryId = diaryId;
        notification.sharedDiaryId = sharedDiaryId;
        notification.isRead = false;
        return notification;
    }

    public void markAsRead() {
        this.isRead = true;
    }
}