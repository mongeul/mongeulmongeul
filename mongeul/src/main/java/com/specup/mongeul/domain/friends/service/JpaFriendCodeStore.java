package com.specup.mongeul.domain.friends.service;

import com.specup.mongeul.domain.friends.entity.FriendCode;
import com.specup.mongeul.domain.friends.repository.FriendCodeRepository;
import com.specup.mongeul.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Primary  // 현재는 JPA 구현체를 기본으로 사용
@RequiredArgsConstructor
public class JpaFriendCodeStore implements FriendCodeStore {
    private final FriendCodeRepository friendCodeRepository;

    @Override
    public void saveCode(String code, User user) {
        friendCodeRepository.deleteByUser(user);

        FriendCode friendCode = FriendCode.create(
                code,
                user,
                LocalDateTime.now().plusMinutes(10)
        );
        friendCodeRepository.save(friendCode);
    }

    @Override
    public User getUserByCode(String code) {
        FriendCode friendCode = friendCodeRepository.findByCode(code);
        if (friendCode == null || friendCode.isExpired()) {
            return null;
        }
        return friendCode.getUser();
    }

    @Override
    public void deleteByUser(User user) {
        friendCodeRepository.deleteByUser(user);
    }

    @Override
    public boolean isValidCode(String code) {
        FriendCode friendCode = friendCodeRepository.findByCode(code);
        return friendCode != null && !friendCode.isExpired();
    }

    public FriendCode findValidCodeByUser(User user) {
        return friendCodeRepository.findByUserAndExpiresAtAfter(user, LocalDateTime.now());
    }
}