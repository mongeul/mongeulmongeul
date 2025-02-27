package com.specup.mongeul.domain.diary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.specup.mongeul.domain.diary.dto.request.ShareDiary.ShareDiaryCreateRequest;
import com.specup.mongeul.domain.diary.dto.request.ShareDiary.ShareDiaryUpdateRequest;
import com.specup.mongeul.domain.diary.dto.response.ShareDiary.ShareDiaryResponse;
import com.specup.mongeul.domain.diary.entity.ShareDiary;
import com.specup.mongeul.domain.diary.repository.ShareDiaryRepository;
import com.specup.mongeul.domain.friends.entity.Friend;
import com.specup.mongeul.domain.friends.repository.FriendRepository;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShareDiaryService {
    private final ShareDiaryRepository shareDiaryRepository;
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;
    private final ObjectMapper objectMapper;


    // 공유일기 생성
    @Transactional
    public ShareDiaryResponse create(Long userId, Long groupId, ShareDiaryCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Friend group = friendRepository.findById(groupId)
                .orElseThrow(() -> new CustomException(ErrorCode.GROUP_NOT_FOUND));

        // 일기 하루 1개 검증
        if (shareDiaryRepository.existsByGroupAndDate(group, request.getDate())) {
            throw new CustomException(ErrorCode.SHARE_DIARY_ALREADY_EXISTS);
        }

        // 차례 검증
        ShareDiary lastDiary = shareDiaryRepository.findLatestByGroup(group);
        if (lastDiary != null) {
            if (lastDiary.getTurnOwner().equals(user)) {
                throw new CustomException(ErrorCode.INVALID_SHARE_DIARY_TURN);
            }
        }

        // pictureLines Json 직렬화
        String pictureLinesJson = null;
        if (request.getPictureLines() != null && !request.getPictureLines().isEmpty()) {
            try {
                pictureLinesJson = objectMapper.writeValueAsString(request.getPictureLines());
            } catch (JsonProcessingException e) {
                throw new RuntimeException("PictureLines Json 직렬화 실패", e);
            }
        }

        ShareDiary shareDiary = shareDiaryRepository.save(
                ShareDiary.create(
                        request.getTitle(), request.getContent(), request.getPicture(),
                        request.getDate(), pictureLinesJson, request.getWeather(),
                        request.getFeeling(), group, user)
        );

        // 차례 변경
        shareDiary.switchTurn();
        return ShareDiaryResponse.from(shareDiary);
    }

    // 공유일기 수정
    @Transactional
    public ShareDiaryResponse update(Long userId, Long groupId, Long shareDiaryId, ShareDiaryUpdateRequest request) {
        Friend group = friendRepository.findById(groupId)
                .orElseThrow(() -> new CustomException(ErrorCode.GROUP_NOT_FOUND));
        ShareDiary shareDiary = shareDiaryRepository.findById(shareDiaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.SHARE_DIARY_NOT_FOUND));

        // 유저 검증
        if (!shareDiary.getTurnOwner().getId().equals(userId)) {
            throw new CustomException(ErrorCode.INVALID_SHARE_DIARY_USER);
        }

        // 날짜 검증
        if (!shareDiary.getDate().equals(request.getDate())) {
            if (shareDiaryRepository.existsByGroupAndDate(group, request.getDate())) {
                throw new CustomException(ErrorCode.SHARE_DIARY_ALREADY_EXISTS);
            }
        }

        String pictureLinesJson = null;
        if (request.getPictureLines() != null && !request.getPictureLines().isEmpty()) {
            try {
                pictureLinesJson = objectMapper.writeValueAsString(request.getPictureLines());
            } catch (JsonProcessingException e) {
                throw new RuntimeException("PictureLines Json 직렬화 실패", e);
            }
        }

        shareDiary.update(
                request.getTitle(), request.getContent(), request.getPicture(),
                request.getDate(), pictureLinesJson, request.getWeather(),
                request.getFeeling());

        return ShareDiaryResponse.from(shareDiary);
    }

    // 캘린더 공유일기 조회
    @Transactional(readOnly = true)
    public List<ShareDiaryResponse> getCalendarShareDiaries(Long userId, Long groupId, int year, int month) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Friend group = friendRepository.findById(groupId)
                .orElseThrow(() -> new CustomException(ErrorCode.GROUP_NOT_FOUND));

        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        List<ShareDiary> shareDiaries = shareDiaryRepository.findByGroupAndDateBetween(group, startOfNextMonth, startOfMonth);
        return shareDiaries.stream()
                .map(ShareDiaryResponse::from)
                .toList();
    }

    // 특정 공유일기 조회
    public ShareDiaryResponse read(Long userId, Long shareDiaryId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        ShareDiary shareDiary = shareDiaryRepository.findById(shareDiaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.SHARE_DIARY_NOT_FOUND));
        return ShareDiaryResponse.from(shareDiary);
    }

    // 공유일기 삭제
}
