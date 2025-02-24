//package com.specup.mongeul.domain.friends.service;
//
//import com.specup.mongeul.domain.user.entity.User;
//import com.specup.mongeul.domain.user.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.stereotype.Service;
//
//import java.util.concurrent.TimeUnit;
//
//@Service
//@RequiredArgsConstructor
//public class RedisFriendCodeStore implements FriendCodeStore {
//    private final RedisTemplate<String, String> redisTemplate;
//    private final UserRepository userRepository;
//    private static final String KEY_PREFIX = "friend_code:";
//    private static final long CODE_EXPIRATION_HOURS = 24L;
//
//    @Override
//    public void saveCode(String code, User user) {
//        String key = KEY_PREFIX + code;
//        redisTemplate.opsForValue().set(
//                key,
//                user.getId().toString(),
//                CODE_EXPIRATION_HOURS,
//                TimeUnit.MINUTES
//        );
//    }
//
//    @Override
//    public User getUserByCode(String code) {
//        String key = KEY_PREFIX + code;
//        String userId = redisTemplate.opsForValue().get(key);
//        if (userId == null) {
//            return null;
//        }
//        return userRepository.findById(Long.parseLong(userId)).orElse(null);
//    }
//
//    @Override
//    public void deleteByUser(User user) {
//        // Redis에서는 유저별 코드 조회가 어려워 만료 시간으로 관리
//    }
//
//    @Override
//    public boolean isValidCode(String code) {
//        String key = KEY_PREFIX + code;
//        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
//    }
//}