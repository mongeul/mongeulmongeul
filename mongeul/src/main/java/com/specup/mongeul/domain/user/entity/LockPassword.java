package com.specup.mongeul.domain.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "lock_password")
public class LockPassword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "password", nullable = false)
    private String lockPassword;

    @Builder
    public LockPassword(User user, String lockPassword) {
        this.user = user;
        this.lockPassword = lockPassword;
    }

    public void updatePassword(String newPassword) {
        this.lockPassword = newPassword;
    }
}