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
import java.util.stream.Collectors;

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

        // 일기 하루에 1개 검증 로직
        if (diaryRepository.findByUserIdAndCreatedAtBetween(userId, startOfDay, endOfDay).isPresent()) {
            throw new CustomException(ErrorCode.DIARY_ALREADY_EXISTS);
        }

        Diary diary = diaryRepository.save(
                Diary.create(request.getTitle(), request.getContent(), request.isLocked(),
                        request.getPicture(), request.getWeather(), request.getFeeling(),
                        request.getIsPrivate(), user)
        );
        return DiaryResponse.from(diary);
    }

    @Transactional
    public DiaryResponse update(Long userId, Long diaryId, DiaryUpdateRequest request) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        if (diary.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.NOT_AUTHORIZED);
        }
        diary.update(request.getTitle(), request.getContent(), request.isLocked(),
                request.getPicture(), request.getWeather(), request.getFeeling(),
                request.getIsPrivate());
        return DiaryResponse.from(diary);
    }

    @Transactional(readOnly = true)
    public List<DiaryResponse> getMyDiaries(Long userId) {
        List<Diary> diaries = diaryRepository.findByUserId(userId);
        return diaries.stream()
                .map(DiaryResponse::from)
                .collect(Collectors.toList());
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
        if (diary.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.NOT_AUTHORIZED);
        }
        diaryRepository.delete(diary);
    }
}
