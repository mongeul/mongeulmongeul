package com.specup.mongeul.domain.friends.service;

import com.specup.mongeul.domain.friends.dto.response.FriendCodeResponse;
import com.specup.mongeul.domain.friends.dto.response.FriendNicknameResponse;
import com.specup.mongeul.domain.friends.dto.response.FriendResponse;
import com.specup.mongeul.domain.friends.entity.Friend;
import com.specup.mongeul.domain.friends.entity.FriendCode;
import com.specup.mongeul.domain.friends.repository.FriendRepository;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepository friendRepository;
    private final UserRepository userRepository;
    private final FriendCodeStore friendCodeStore;
    private static final int CODE_LENGTH = 4;
    private final JpaFriendCodeStore jpaFriendCodeStore;

    @Transactional(readOnly = true)
    public List<FriendResponse> getFriends(User user) {
        Long userId = user.getId();

        return friendRepository.findByUserIdOrFriendId(userId).stream()
                .filter(friend -> {
                    // status에 따라 친구 목록에 표시 여부 결정
                    // status가 0이면 양쪽 다 친구
                    if (friend.getStatus() == 0) {
                        return true;
                    }
                    // status가 1이고 현재 사용자가 friend_id에 해당하면 표시
                    else if (friend.getStatus() == 1 && friend.getFriend().getId().equals(userId)) {
                        return true;
                    }
                    // status가 2이고 현재 사용자가 user_id에 해당하면 표시
                    else if (friend.getStatus() == 2 && friend.getUser().getId().equals(userId)) {
                        return true;
                    }
                    // status가 3이면 양쪽 다 삭제한 상태이므로 표시하지 않음
                    return false;
                })
                .map(friend -> {
                    User friendUser = friend.getUser().getId().equals(userId)
                            ? friend.getFriend()
                            : friend.getUser();

                    return FriendResponse.of(
                            friendUser.getId(),
                            friendUser.getNickname(),
                            friend.getCount(),
                            ChronoUnit.DAYS.between(friend.getCreatedAt().toLocalDate(), LocalDateTime.now()),
                            // TODO 일기 쓸 순서 구하는 로직 구현 예정
                            false
                    );
                })
                .toList();
    }

    @Transactional
    public FriendCodeResponse generateFriendCode(User user) {
        // 유효한 기존 코드가 있는지 확인
        FriendCode existingCode = jpaFriendCodeStore.findValidCodeByUser(user);

        // 유효한 코드가 있으면 그것을 반환
        if (existingCode != null) {
            return FriendCodeResponse.builder()
                    .code(existingCode.getCode())
                    .build();
        }

        // 유효한 코드가 없으면 새로 생성
        String newCode = generateRandomCode();
        jpaFriendCodeStore.saveCode(newCode, user);

        return FriendCodeResponse.builder()
                .code(newCode)
                .build();
    }

    @Transactional(readOnly = true)
    public FriendNicknameResponse searchFriend(User user, String code) {
        User friend = friendCodeStore.getUserByCode(code);
        if (friend == null) {
            throw new CustomException(ErrorCode.INVALID_FRIEND_CODE);
        }

        if (user.getId().equals(friend.getId())) {
            throw new CustomException(ErrorCode.CANNOT_ADD_SELF_AS_FRIEND);
        }

        return FriendNicknameResponse.builder()
                .nickname(friend.getNickname())
                .build();
    }

    @Transactional
    public FriendNicknameResponse addFriend(User user, String code) {
        User friend = friendCodeStore.getUserByCode(code);

        if (friend == null) {
            throw new CustomException(ErrorCode.INVALID_FRIEND_CODE);
        }

        if (user.getId().equals(friend.getId())) {
            throw new CustomException(ErrorCode.CANNOT_ADD_SELF_AS_FRIEND);
        }

        if (friendRepository.existsByUserAndFriend(user, friend)) {
            throw new CustomException(ErrorCode.ALREADY_FRIEND);
        }

        friendRepository.save(Friend.create(user, friend));

        return FriendNicknameResponse.builder()
                .nickname(friend.getNickname())
                .build();
    }

    @Transactional
    public void deleteFriend(User user, Long friendId) {
        User friend = userRepository.findById(friendId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Optional<Friend> friendRelationOpt = friendRepository.findFriendRelationship(user, friendId);

        if (!friendRelationOpt.isPresent()) {
            throw new CustomException(ErrorCode.FRIEND_NOT_FOUND);
        }

        Friend friendRelation = friendRelationOpt.get();
        Short currentStatus = friendRelation.getStatus();
        Short newStatus;

        // 상태 업데이트 로직
        if (friendRelation.getUser().getId().equals(user.getId())) {
            // 사용자가 user_id 쪽이면 status를 1 또는 3으로 설정
            newStatus = (currentStatus == 2) ? (short) 3 : (short) 1;
        } else {
            // 사용자가 friend_id 쪽이면 status를 2 또는 3으로 설정
            newStatus = (currentStatus == 1) ? (short) 3 : (short) 2;
        }

        friendRepository.updateStatus(friendRelation.getId(), newStatus);
    }

    private String generateRandomCode() {
        SecureRandom random = new SecureRandom();
        StringBuilder code = new StringBuilder();
        String digits = "0123456789";

        for (int i = 0; i < CODE_LENGTH; i++) {
            code.append(digits.charAt(random.nextInt(digits.length())));
        }

        return code.toString();
    }
}