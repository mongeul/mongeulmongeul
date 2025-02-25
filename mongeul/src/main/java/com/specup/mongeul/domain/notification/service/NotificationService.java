package com.specup.mongeul.domain.notification.service;

import com.specup.mongeul.domain.notification.dto.NotificationDTO;
import com.specup.mongeul.domain.notification.entity.Notification;
import com.specup.mongeul.domain.notification.entity.NotificationType;
import com.specup.mongeul.domain.notification.repository.NotificationRepository;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Transactional(readOnly = true)
    public List<NotificationDTO> getNotifications(User user) {
        List<Notification> notifications = notificationRepository.findByUserOrderByCreatedAtDesc(user);

        return notifications.stream()
                .map(NotificationDTO::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public void markNotificationAsRead(User user, Long notificationId) {
        int updatedRows = notificationRepository.markAsRead(notificationId, user.getId());

        if (updatedRows == 0) {
            throw new CustomException(ErrorCode.NOTIFICATION_NOT_FOUND);
        }
    }

    /**
     * 일반적인 알림 생성 메서드
     */
    @Transactional
    public Notification createNotification(User user, String title, NotificationType type, Long diaryId, Long sharedDiaryId) {
        Notification notification = Notification.create(user, title, type, diaryId, sharedDiaryId);
        return notificationRepository.save(notification);
    }

    /**
     * 댓글 알림 생성 메서드
     * @param user 알림을 받을 사용자
     * @param commentWriterNickname 댓글 작성자 닉네임
     * @param diaryId 해당 일기 ID
     */
    @Transactional
    public Notification createCommentNotification(User user, String commentWriterNickname, Long diaryId) {
        String title = commentWriterNickname + "님의 댓글";
        return createNotification(user, title, NotificationType.COMMENT, diaryId, null);
    }

    /**
     * 공감(이모지, 반응) 알림 생성 메서드
     * @param user 알림을 받을 사용자
     * @param reactorNickname 공감한 사용자 닉네임
     * @param diaryId 해당 일기 ID
     */
    @Transactional
    public Notification createReactionNotification(User user, String reactorNickname, Long diaryId) {
        String title = reactorNickname + "님의 공감";
        return createNotification(user, title, NotificationType.REACTION, diaryId, null);
    }

    /**
     * 공유 일기 도착 알림 생성 메서드
     * @param user 알림을 받을 사용자
     * @param sharedByNickname 일기를 공유한 사용자 닉네임
     * @param sharedDiaryId 공유된 일기 ID
     */
    @Transactional
    public Notification createSharedDiaryNotification(User user, String sharedByNickname, Long sharedDiaryId) {
        String title = sharedByNickname + "님의 공유 일기";
        return createNotification(user, title, NotificationType.FRIEND_REQUEST, null, sharedDiaryId);
    }
}