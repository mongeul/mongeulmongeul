package com.specup.mongeul.domain.friends.repository;

import com.specup.mongeul.domain.friends.entity.FriendCode;
import com.specup.mongeul.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface FriendCodeRepository extends JpaRepository<FriendCode, Long> {
    FriendCode findByCode(String code);
    void deleteByUser(User user);
    FriendCode findByUserAndExpiresAtAfter(User user, LocalDateTime dateTime);
}