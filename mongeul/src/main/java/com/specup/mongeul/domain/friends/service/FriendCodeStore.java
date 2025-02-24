package com.specup.mongeul.domain.friends.service;

import com.specup.mongeul.domain.user.entity.User;

public interface FriendCodeStore {
    void saveCode(String code, User user);
    User getUserByCode(String code);
    void deleteByUser(User user);
    boolean isValidCode(String code);
}