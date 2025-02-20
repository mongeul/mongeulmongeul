package com.specup.mongeul.domain.diary.service;

import com.specup.mongeul.domain.diary.dto.request.DiaryCreateRequest;
import com.specup.mongeul.domain.diary.dto.request.DiaryUpdateRequest;
import com.specup.mongeul.domain.diary.dto.response.DiaryResponse;
import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.repository.DiaryRepository;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaryService {
    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;

    @Transactional
    public DiaryResponse create(Long userId, DiaryCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        LocalDateTime startOfDay = LocalDateTime.now().with(LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.MAX);

        // 일기 하루에 1개 검증 로직 (데이터 조회 ver)
//        if (diaryRepository.findByUserIdAndCreatedAtBetween(userId, startOfDay, endOfDay).isPresent()) {
//            throw new CustomException(ErrorCode.DIARY_ALREADY_EXISTS);
//        }

        // 일기 하루에 1개 검증 로직 (존재여부 체크 ver)
        if (diaryRepository.existsByUserIdAndCreatedAtBetween(userId, startOfDay, endOfDay)) {
            throw new CustomException(ErrorCode.DIARY_ALREADY_EXISTS);
        }

        Diary diary = diaryRepository.save(
                Diary.create(request.getTitle(), request.getContent(), request.getPicture(),
                        request.getWeather(), request.getFeeling(), request.getPrivateStatus(), user)
        );
        return DiaryResponse.from(diary);
    }

    @Transactional
    public DiaryResponse update(Long userId, Long diaryId, DiaryUpdateRequest request) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        if (!diary.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.INVALID_DIARY_USER);
        }
        diary.update(request.getTitle(), request.getContent(), request.getPicture(),
                request.getWeather(), request.getFeeling(), request.getPrivateStatus());
        return DiaryResponse.from(diary);
    }

    @Transactional(readOnly = true)
    public List<DiaryResponse> getCalendarDiaries(Long userId, int year, int month) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        LocalDateTime startOfMonth = LocalDateTime.of(year, month, 1, 0, 0, 0);
        LocalDateTime startOfNextMonth = startOfMonth.plusMonths(1);

        List<Diary> diaries = diaryRepository.findByUserAndCreatedAtBetween(user, startOfMonth, startOfNextMonth);
        return diaries.stream()
                .map(DiaryResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public DiaryResponse read(Long diaryId) {
        return DiaryResponse.from(diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND)));
    }

    @Transactional
    public void delete(Long userId, Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        if (!diary.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.INVALID_DIARY_USER);
        }
        diaryRepository.delete(diary);
    }
}
