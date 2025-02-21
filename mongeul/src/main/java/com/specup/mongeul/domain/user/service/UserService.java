package com.specup.mongeul.domain.user.service;

import com.specup.mongeul.domain.user.dto.request.*;
import com.specup.mongeul.domain.user.dto.response.*;
import com.specup.mongeul.domain.user.entity.LockPassword;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.LockPasswordRepository;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.auth.TokenBlacklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final LockPasswordRepository lockPasswordRepository;
    private final TokenBlacklistService tokenBlacklistService;

    @Transactional
    public NicknameResponse setNickname(NicknameRequest request, User user) {
        user.updateNickname(request.getNickname());
        userRepository.save(user);

        return NicknameResponse.builder()
                .nickname(request.getNickname())
                .build();
    }

    @Transactional
    public void logout(String accessToken, String refreshToken) {
        tokenBlacklistService.addToBlacklist(accessToken);
        tokenBlacklistService.addToBlacklist(refreshToken);
    }

    public UserResponse getMyInfo(User user) {
        return UserResponse.from(user);
    }

    @Transactional
    public void withdraw(User user) {
        userRepository.delete(user);
    }

    @Transactional
    public void setLockPassword(LockPasswordRequest request, User user) {
        LockPassword lockPassword = lockPasswordRepository.findByUser(user)
                .orElse(LockPassword.builder()
                        .user(user)
                        .lockPassword(request.getLockPassword())
                        .build());

        lockPassword.updatePassword(request.getLockPassword());
        lockPasswordRepository.save(lockPassword);
    }
}