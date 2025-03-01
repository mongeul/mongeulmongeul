package com.specup.mongeul.domain.diary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.specup.mongeul.domain.diary.dto.common.PictureLineDto;
import com.specup.mongeul.domain.diary.dto.request.Diary.DiaryCreateRequest;
import com.specup.mongeul.domain.diary.dto.request.Diary.DiaryUpdateRequest;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryDateResponse;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryResponse;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryPictureLineResponse;
import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.repository.DiaryRepository;
import com.specup.mongeul.domain.user.entity.LockPassword;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.LockPasswordRepository;
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
public class DiaryService {
    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;
    private final LockPasswordRepository lockPasswordRepository;
    private final ObjectMapper objectMapper;

    // 일기 생성
    @Transactional
    public DiaryResponse create(Long userId, DiaryCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if (diaryRepository.existsByUserIdAndDateAndPublished(userId, request.getDate(), true)) {
            throw new CustomException(ErrorCode.DIARY_ALREADY_EXISTS);
        }

//        LocalDateTime startOfDay = LocalDateTime.now().with(LocalTime.MIN);
//        LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.MAX);

        // 일기 하루에 1개 검증 로직 (데이터 조회 ver)
//        if (diaryRepository.findByUserIdAndCreatedAtBetween(userId, startOfDay, endOfDay).isPresent()) {
//            throw new CustomException(ErrorCode.DIARY_ALREADY_EXISTS);
//        }

        // 일기 하루에 1개 검증 로직 (존재여부 체크 ver) 이전
//        if (diaryRepository.existsByUserIdAndCreatedAtBetween(userId, startOfDay, endOfDay)) {
//            throw new CustomException(ErrorCode.DIARY_ALREADY_EXISTS);
//        }

        String pictureLinesJson = null;
        if (request.getPictureLines() != null && !request.getPictureLines().isEmpty()) {
            try {
                pictureLinesJson = objectMapper.writeValueAsString(request.getPictureLines());
            } catch (JsonProcessingException e) {
                throw new RuntimeException("PictureLines Json 직렬화 실패", e);
            }
        }

        Diary diary = diaryRepository.save(
                Diary.create(
                        request.getTitle(), request.getContent(), request.getPicture(),
                        request.getDate(), pictureLinesJson, request.getWeather(), request.getFeeling(),
                        request.getPrivateStatus(), true, user
                )
        );
        return DiaryResponse.from(diary);
    }

    // 일기 임시저장
    @Transactional
    public DiaryResponse saveDraft(Long userId, DiaryCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        String pictureLinesJson = null;
        if (request.getPictureLines() != null && !request.getPictureLines().isEmpty()) {
            try {
                pictureLinesJson = objectMapper.writeValueAsString(request.getPictureLines());
            } catch (JsonProcessingException e) {
                throw new RuntimeException("PictureLines Json 직렬화 실패", e);
            }
        }

        Diary diary = diaryRepository.save(
                Diary.create(
                        request.getTitle(), request.getContent(), request.getPicture(),
                        request.getDate(), pictureLinesJson, request.getWeather(), request.getFeeling(),
                        request.getPrivateStatus(), false, user
                )
        );
        return DiaryResponse.from(diary);
    }

    // 일기 수정
    @Transactional
    public DiaryResponse update(Long userId, Long diaryId, DiaryUpdateRequest request) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));

        if (!diary.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.INVALID_DIARY_USER);
        }

        if (!diary.getDate().equals(request.getDate()) && diary.getPublished()) {
            if (diaryRepository.existsByUserIdAndDateAndPublished(userId, request.getDate(), true)) {
                throw new CustomException(ErrorCode.DIARY_ALREADY_EXISTS);
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

        diary.update(
                request.getTitle(), request.getContent(), request.getPicture(),
                request.getDate(), pictureLinesJson, request.getWeather(),
                request.getFeeling(), request.getPrivateStatus(), diary.getPublished());

        return DiaryResponse.from(diary);
    }

    // 캘린더 일기 조회
    @Transactional(readOnly = true)
    public List<DiaryResponse> getCalendarDiaries(Long userId, int year, int month) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        List<Diary> diaries = diaryRepository.findByUserAndDateBetween(user, startOfMonth, startOfNextMonth);
        return diaries.stream()
                .map(DiaryResponse::from)
                .toList();
    }

    // 특정 일기 조회
    @Transactional(readOnly = true)
    public DiaryResponse read(Long userId, Long diaryId, String lockPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        if (diary.getPrivateStatus() == DiaryPrivate.LOCK) {
            if (lockPassword == null || lockPassword.isEmpty()) {
                throw new CustomException(ErrorCode.DIARY_LOCK_PASSWORD_REQUIRED);
            }
            LockPassword lock = lockPasswordRepository.findByUser(user)
                    .orElseThrow(() -> new CustomException(ErrorCode.DIARY_LOCK_PASSWORD_REQUIRED));

            if (!lock.getLockPassword().equals(lockPassword)) {
                throw new CustomException(ErrorCode.DIARY_INVALID_LOCK_PASSWORD);
            }
        }
        return DiaryResponse.from(diary);
    }

    // 일기 삭제
    @Transactional
    public void delete(Long userId, Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        if (!diary.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.INVALID_DIARY_USER);
        }
        diaryRepository.delete(diary);
    }

    // 그림 조회
    @Transactional(readOnly = true)
    public DiaryPictureLineResponse readPicture(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        List<PictureLineDto> pictureLines = null;
        if (diary.getPictureLines() != null && !diary.getPictureLines().isEmpty()) {
            try {
                pictureLines = objectMapper.readValue(diary.getPictureLines(),
                        objectMapper.getTypeFactory().constructCollectionType(List.class, PictureLineDto.class));
            } catch (JsonProcessingException e) {
                throw new RuntimeException("PictureLines JSON 역직렬화 실패", e);
            }
        }
        return DiaryPictureLineResponse.from(diary.getId(), pictureLines);
    }

    // 일기 작성 날짜 조회
    @Transactional(readOnly = true)
    public List<DiaryDateResponse> getDates(Long userId, int year, int month) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        List<Diary> diaries = diaryRepository.findByUserAndDateBetween(user, startOfMonth, startOfNextMonth);
        return diaries.stream()
                .map(DiaryDateResponse::from)
                .toList();
    }
}
