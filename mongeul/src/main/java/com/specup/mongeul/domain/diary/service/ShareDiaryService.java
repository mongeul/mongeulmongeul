package com.specup.mongeul.domain.diary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.specup.mongeul.domain.diary.dto.common.PictureLineDto;
import com.specup.mongeul.domain.diary.dto.request.ShareDiary.ShareDiaryCreateRequest;
import com.specup.mongeul.domain.diary.dto.request.ShareDiary.ShareDiaryUpdateRequest;
import com.specup.mongeul.domain.diary.dto.response.ShareDiary.ShareDiaryDateResponse;
import com.specup.mongeul.domain.diary.dto.response.ShareDiary.ShareDiaryPictureLineResponse;
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
        if (shareDiaryRepository.existsByGroupAndDateAndPublished(group, request.getDate(), true)) {
            throw new CustomException(ErrorCode.SHARE_DIARY_ALREADY_EXISTS);
        }

        // 차례 검증
        ShareDiary lastDiary = shareDiaryRepository.findLatestByGroup(group);
        if (lastDiary != null && lastDiary.getWriter().equals(user)) {
            throw new CustomException(ErrorCode.INVALID_SHARE_DIARY_TURN);
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
                        request.getFeeling(), true, group, user
                )
        );
        return ShareDiaryResponse.from(shareDiary);
    }

    // 공유일기 임시저장

    // 공유일기 수정
    @Transactional
    public ShareDiaryResponse update(Long userId, Long groupId, Long shareDiaryId, ShareDiaryUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Friend group = friendRepository.findById(groupId)
                .orElseThrow(() -> new CustomException(ErrorCode.GROUP_NOT_FOUND));
        ShareDiary shareDiary = shareDiaryRepository.findById(shareDiaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.SHARE_DIARY_NOT_FOUND));

        // 유저 검증
        if (!shareDiary.getWriter().getId().equals(userId)) {
            throw new CustomException(ErrorCode.INVALID_SHARE_DIARY_USER);
        }

        // 날짜 검증
        if (!shareDiary.getDate().equals(request.getDate()) && shareDiary.getPublished()) {
            if (shareDiaryRepository.existsByGroupAndDateAndPublished(group, request.getDate(), true)) {
                throw new CustomException(ErrorCode.SHARE_DIARY_ALREADY_EXISTS);
            }
        }

        // 차례 검증
        ShareDiary lastDiary = shareDiaryRepository.findLatestByGroup(group);
        if (lastDiary != null && lastDiary.getWriter().equals(user)) {
            throw new CustomException(ErrorCode.SHARE_DIARY_NOT_UPDATE_DATE);
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
                request.getFeeling(), shareDiary.getPublished());

        return ShareDiaryResponse.from(shareDiary);
    }

    // 캘린더 공유일기 조회
    @Transactional(readOnly = true)
    public List<ShareDiaryResponse> getCalendarShareDiaries(Long groupId, int year, int month) {
        Friend group = friendRepository.findById(groupId)
                .orElseThrow(() -> new CustomException(ErrorCode.GROUP_NOT_FOUND));

        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        List<ShareDiary> shareDiaries = shareDiaryRepository.findByGroupAndDateBetween(group, startOfMonth, startOfNextMonth);
        return shareDiaries.stream()
                .map(ShareDiaryResponse::from)
                .toList();
    }

    // 공유일기 임시저장 목록 조회

    // 특정 공유일기 조회
    @Transactional(readOnly = true)
    public ShareDiaryResponse read(Long shareDiaryId) {
        ShareDiary shareDiary = shareDiaryRepository.findById(shareDiaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.SHARE_DIARY_NOT_FOUND));
        return ShareDiaryResponse.from(shareDiary);
    }

    // 공유일기 삭제
    @Transactional
    public void delete(Long userId, Long shareDiaryId) {
        ShareDiary shareDiary = shareDiaryRepository.findById(shareDiaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.SHARE_DIARY_NOT_FOUND));
        if (!shareDiary.getWriter().getId().equals(userId)) {
            throw new CustomException(ErrorCode.INVALID_SHARE_DIARY_USER);
        }
        shareDiaryRepository.delete(shareDiary);
    }

    // 공유일기 그림 조회
    @Transactional(readOnly = true)
    public ShareDiaryPictureLineResponse readPicture(Long shareDiaryId) {
        ShareDiary shareDiary = shareDiaryRepository.findById(shareDiaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.SHARE_DIARY_NOT_FOUND));

        List<PictureLineDto> pictureLines = null;
        if (shareDiary.getPictureLines() != null && !shareDiary.getPictureLines().isEmpty()) {
            try {
                pictureLines = objectMapper.readValue(shareDiary.getPictureLines(),
                        objectMapper.getTypeFactory().constructCollectionType(List.class, PictureLineDto.class));
            } catch (JsonProcessingException e) {
                throw new RuntimeException("PictureLines JSON 역직렬화 실패", e);
            }
        }
        return ShareDiaryPictureLineResponse.from(shareDiary.getId(), pictureLines);
    }

    // 공유일기 작성 날짜 조회
    @Transactional(readOnly = true)
    public List<ShareDiaryDateResponse> getDates(Long groupId, int year, int month) {
        Friend group = friendRepository.findById(groupId)
                .orElseThrow(() -> new CustomException(ErrorCode.GROUP_NOT_FOUND));

        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        List<ShareDiary> shareDiaries = shareDiaryRepository.findByGroupAndDateBetween(group, startOfMonth, startOfNextMonth);
        return shareDiaries.stream()
                .map(ShareDiaryDateResponse::from)
                .toList();
    }
}
