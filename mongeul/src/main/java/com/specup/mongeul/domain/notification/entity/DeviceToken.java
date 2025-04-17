package com.specup.mongeul.domain.notification.entity;

import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "device_tokens")
public class DeviceToken extends BaseTimeEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String token;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private boolean enabled = true;

    public static DeviceToken create(String token, User user) {
        DeviceToken deviceToken = new DeviceToken();
        deviceToken.token = token;
        deviceToken.user = user;
        return deviceToken;
    }
    
    public void disable() {
        this.enabled = false;
    }
    
    public void enable() {
        this.enabled = true;
    }
}