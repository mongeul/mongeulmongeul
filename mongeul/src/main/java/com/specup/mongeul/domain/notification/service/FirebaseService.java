package com.specup.mongeul.domain.notification.service;

import com.google.firebase.messaging.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Slf4j
@Service
@RequiredArgsConstructor
public class FirebaseService {

    /**
     * 단일 디바이스에 알림 전송
     * @param token FCM 디바이스 토큰
     * @param title 알림 제목
     * @param body 알림 내용
     * @param data 추가 데이터
     * @return 메시지 ID
     */
    public String sendNotificationToDevice(String token, String title, String body, Map<String, String> data) {
        try {
            Notification notification = Notification.builder()
                    .setTitle(title)
                    .setBody(body)
                    .build();

            Message.Builder messageBuilder = Message.builder()
                    .setToken(token)
                    .setNotification(notification);

            if (data != null) {
                messageBuilder.putAllData(data);
            }

            Message message = messageBuilder.build();

            return FirebaseMessaging.getInstance().sendAsync(message).get();
        } catch (InterruptedException | ExecutionException e) {
            log.error("Failed to send notification to device with token: {}", token, e);
            throw new RuntimeException("알림 전송 중 오류가 발생했습니다.", e);
        }
    }

    /**
     * 여러 디바이스에 동일한 알림 전송
     * @param tokens FCM 디바이스 토큰 리스트
     * @param title 알림 제목
     * @param body 알림 내용
     * @param data 추가 데이터
     * @return BatchResponse
     */
    public BatchResponse sendNotificationToDevices(List<String> tokens, String title, String body, Map<String, String> data) {
        try {
            MulticastMessage.Builder messageBuilder = MulticastMessage.builder()
                    .addAllTokens(tokens)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(body)
                            .build());

            if (data != null) {
                messageBuilder.putAllData(data);
            }

            MulticastMessage message = messageBuilder.build();

            return FirebaseMessaging.getInstance().sendMulticastAsync(message).get();
        } catch (InterruptedException | ExecutionException e) {
            log.error("Failed to send notification to multiple devices", e);
            throw new RuntimeException("여러 디바이스에 알림 전송 중 오류가 발생했습니다.", e);
        }
    }

    /**
     * 특정 토픽을 구독한 디바이스들에 알림 전송
     * @param topic 토픽 이름
     * @param title 알림 제목
     * @param body 알림 내용
     * @param data 추가 데이터
     * @return 메시지 ID
     */
    public String sendNotificationToTopic(String topic, String title, String body, Map<String, String> data) {
        try {
            Message.Builder messageBuilder = Message.builder()
                    .setTopic(topic)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(body)
                            .build());

            if (data != null) {
                messageBuilder.putAllData(data);
            }

            Message message = messageBuilder.build();

            return FirebaseMessaging.getInstance().sendAsync(message).get();
        } catch (InterruptedException | ExecutionException e) {
            log.error("Failed to send notification to topic: {}", topic, e);
            throw new RuntimeException("토픽 알림 전송 중 오류가 발생했습니다.", e);
        }
    }

    /**
     * 토픽 구독
     * @param tokens FCM 디바이스 토큰 리스트
     * @param topic 구독할 토픽 이름
     */
    public void subscribeToTopic(List<String> tokens, String topic) {
        try {
            TopicManagementResponse response = FirebaseMessaging.getInstance()
                    .subscribeToTopicAsync(tokens, topic)
                    .get();
            
            log.info("Successfully subscribed {} tokens to topic {}, failed: {}", 
                    tokens.size() - response.getFailureCount(),
                    topic,
                    response.getFailureCount());
                    
        } catch (InterruptedException | ExecutionException e) {
            log.error("Failed to subscribe to topic: {}", topic, e);
            throw new RuntimeException("토픽 구독 중 오류가 발생했습니다.", e);
        }
    }

    /**
     * 토픽 구독 해제
     * @param tokens FCM 디바이스 토큰 리스트
     * @param topic 구독 해제할 토픽 이름
     */
    public void unsubscribeFromTopic(List<String> tokens, String topic) {
        try {
            TopicManagementResponse response = FirebaseMessaging.getInstance()
                    .unsubscribeFromTopicAsync(tokens, topic)
                    .get();
                    
            log.info("Successfully unsubscribed {} tokens from topic {}, failed: {}", 
                    tokens.size() - response.getFailureCount(),
                    topic,
                    response.getFailureCount());
                    
        } catch (InterruptedException | ExecutionException e) {
            log.error("Failed to unsubscribe from topic: {}", topic, e);
            throw new RuntimeException("토픽 구독 해제 중 오류가 발생했습니다.", e);
        }
    }
}