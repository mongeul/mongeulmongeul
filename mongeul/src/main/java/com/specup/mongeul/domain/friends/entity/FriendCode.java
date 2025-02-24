package com.specup.mongeul.domain.friends.entity;

import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "friend_codes")
public class FriendCode extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    public static FriendCode create(String code, User user, LocalDateTime expiresAt) {
        FriendCode friendCode = new FriendCode();
        friendCode.code = code;
        friendCode.user = user;
        friendCode.expiresAt = expiresAt;
        return friendCode;
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiresAt);
    }
}