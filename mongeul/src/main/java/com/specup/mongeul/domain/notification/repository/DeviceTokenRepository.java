package com.specup.mongeul.domain.notification.repository;

import com.specup.mongeul.domain.notification.entity.DeviceToken;
import com.specup.mongeul.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceTokenRepository extends JpaRepository<DeviceToken, Long> {
    Optional<DeviceToken> findByTokenAndUser(String token, User user);

    @Query("SELECT dt FROM DeviceToken dt WHERE dt.user.id = :userId AND dt.enabled = true")
    List<DeviceToken> findActiveTokensByUserId(Long userId);

    @Query("SELECT dt FROM DeviceToken dt WHERE dt.user.id IN :userIds AND dt.enabled = true")
    List<DeviceToken> findActiveTokensByUserIds(List<Long> userIds);

    @Query("SELECT dt FROM DeviceToken dt WHERE dt.enabled = true")
    List<DeviceToken> findAllActiveTokens();
}