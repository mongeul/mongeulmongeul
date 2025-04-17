package com.specup.mongeul.domain.notification.service;

import com.specup.mongeul.domain.notification.dto.NotificationDTO;
import com.specup.mongeul.domain.notification.dto.request.DeviceTokenRequest;
import com.specup.mongeul.domain.notification.entity.DeviceToken;
import com.specup.mongeul.domain.notification.entity.Notification;
import com.specup.mongeul.domain.notification.entity.NotificationType;
import com.specup.mongeul.domain.notification.repository.DeviceTokenRepository;
import com.specup.mongeul.domain.notification.repository.NotificationRepository;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final DeviceTokenRepository deviceTokenRepository;
    private final UserRepository userRepository;
    private final FirebaseService firebaseService;

    @Transactional(readOnly = true)
    public List<NotificationDTO> getNotifications(User user) {
//        List<Notification> notifications = notificationRepository.findByUserOrderByCreatedAtDesc(user);
        List<Notification> notifications = notificationRepository.findUnreadByUser(user);


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
        Notification savedNotification = notificationRepository.save(notification);
        
        // 푸시 알림 전송
        sendPushNotification(user, title, type.getMessage(), type, diaryId, sharedDiaryId);
        
        return savedNotification;
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
    
    /**
     * 기기 토큰 등록
     * @param user 사용자 객체
     * @param request 기기 토큰 요청
     */
    @Transactional
    public void registerDeviceToken(User user, DeviceTokenRequest request) {
        try {
            Optional<DeviceToken> existingToken = deviceTokenRepository.findByTokenAndUser(request.getToken(), user);
            
            if (existingToken.isPresent()) {
                DeviceToken token = existingToken.get();
                token.enable();
            } else {
                DeviceToken newToken = DeviceToken.create(request.getToken(), user);
                deviceTokenRepository.save(newToken);
                
                // 사용자를 위한 기본 토픽 구독
                try {
                    firebaseService.subscribeToTopic(List.of(request.getToken()), "user_" + user.getId());
                } catch (Exception e) {
                    log.error("Failed to subscribe to user topic", e);
                }
            }
        } catch (Exception e) {
            log.error("기기 토큰 등록 중 오류 발생", e);
            throw new CustomException(ErrorCode.DEVICE_TOKEN_REGISTRATION_FAILED);
        }
    }
    
    /**
     * 기기 토큰 등록 해제
     * @param user 사용자 객체
     * @param request 기기 토큰 요청
     */
    @Transactional
    public void unregisterDeviceToken(User user, DeviceTokenRequest request) {
        try {
            deviceTokenRepository.findByTokenAndUser(request.getToken(), user)
                    .ifPresent(token -> {
                        token.disable();
                        
                        // 토픽 구독 해제
                        try {
                            firebaseService.unsubscribeFromTopic(List.of(request.getToken()), "user_" + user.getId());
                        } catch (Exception e) {
                            log.error("Failed to unsubscribe from user topic", e);
                        }
                    });
        } catch (Exception e) {
            log.error("기기 토큰 등록 해제 중 오류 발생", e);
            throw new CustomException(ErrorCode.DEVICE_TOKEN_UNREGISTRATION_FAILED);
        }
    }
    
    /**
     * 푸시 알림 전송
     * @param user 알림을 받을 사용자
     * @param title 알림 제목
     * @param message 알림 내용
     */
    @Async
    protected void sendPushNotification(User user, String title, String message, NotificationType type, Long diaryId, Long sharedDiaryId) {
        List<DeviceToken> deviceTokens = deviceTokenRepository.findActiveTokensByUserId(user.getId());
        
        if (deviceTokens.isEmpty()) {
            log.debug("No active device tokens found for user: {}", user.getId());
            return;
        }
        
        Map<String, String> data = new HashMap<>();
        data.put("type", type.name());
        
        if (diaryId != null) {
            data.put("diaryId", diaryId.toString());
        }
        
        if (sharedDiaryId != null) {
            data.put("sharedDiaryId", sharedDiaryId.toString());
        }
        
        // 사용자별 토픽으로 알림 전송 (개별 토큰보다 효율적)
        try {
            firebaseService.sendNotificationToTopic("user_" + user.getId(), title, message, data);
            log.debug("Notification sent to topic user_{}", user.getId());
        } catch (Exception e) {
            log.error("Failed to send notification to topic user_{}", user.getId(), e);
            
            // 토픽 전송 실패 시 개별 토큰으로 시도
            List<String> tokens = deviceTokens.stream()
                    .map(DeviceToken::getToken)
                    .collect(Collectors.toList());
                    
            try {
                firebaseService.sendNotificationToDevices(tokens, title, message, data);
                log.debug("Notification sent to individual tokens for user: {}", user.getId());
            } catch (Exception ex) {
                log.error("Failed to send notification to individual tokens for user: {}", user.getId(), ex);
            }
        }
    }
    
    /**
     * 모든 알림 읽음 처리
     * @param userId 사용자 ID
     */
    @Transactional
    public void markAllAsRead(Long userId) {
        notificationRepository.markAllAsRead(userId);
    }
    
    /**
     * 읽지 않은 알림 개수 조회
     * @param user 사용자
     * @return 읽지 않은 알림 개수
     */
    @Transactional(readOnly = true)
    public long countUnreadNotifications(User user) {
        return notificationRepository.countUnreadByUserId(user.getId());
    }

    @Transactional
    public String sendCommentNotification(User user, String commentContent, Long diaryId) {
        try {
            // 알림 생성
            Notification notification = createNotification(
                    user,
                    "새로운 댓글",
                    NotificationType.COMMENT,
                    diaryId,
                    null
            );

            return "알림 발송 성공";
        } catch (Exception e) {
            log.error("댓글 알림 발송 중 오류 발생", e);
            throw new CustomException(ErrorCode.NOTIFICATION_SENDING_FAILED);
        }
    }

    @Transactional
    public String sendEmojiNotification(User user, String emojiName, Long diaryId) {
        try {
            // 알림 생성
            Notification notification = createNotification(
                    user,
                    "새로운 이모지",
                    NotificationType.REACTION,
                    diaryId,
                    null
            );

            return "알림 발송 성공";
        } catch (Exception e) {
            log.error("이모지 알림 발송 중 오류 발생", e);
            throw new CustomException(ErrorCode.NOTIFICATION_SENDING_FAILED);
        }
    }

    @Transactional
    public String sendShareDiaryNotification(User user, String diaryTitle, Long shareDiaryId) {
        try {
            // 알림 생성
            Notification notification = createNotification(
                    user,
                    "새로운 공유 일기",
                    NotificationType.FRIEND_REQUEST,
                    null,
                    shareDiaryId
            );

            return "알림 발송 성공";
        } catch (Exception e) {
            log.error("공유 일기 알림 발송 중 오류 발생", e);
            throw new CustomException(ErrorCode.NOTIFICATION_SENDING_FAILED);
        }
    }

    @Transactional
    public String sendBroadcastNotification(User user, String title, String body) {
        try {
            // 모든 활성 기기 토큰 조회
            List<DeviceToken> deviceTokens = deviceTokenRepository.findAllActiveTokens();

            if (deviceTokens.isEmpty()) {
                return "발송할 기기 토큰이 없습니다.";
            }

            List<String> tokens = deviceTokens.stream()
                    .map(DeviceToken::getToken)
                    .collect(Collectors.toList());

            // 전체 기기에 알림 발송
            Map<String, String> data = new HashMap<>();
            data.put("type", "BROADCAST");
            data.put("senderId", user.getId().toString());

            firebaseService.sendNotificationToDevices(tokens, title, body, data);
            return "브로드캐스트 알림 발송 성공";
        } catch (Exception e) {
            log.error("브로드캐스트 알림 발송 실패", e);
            throw new CustomException(ErrorCode.NOTIFICATION_SENDING_FAILED);
        }
    }
}