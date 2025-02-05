package com.specup.mongeul.domain.diary.service;

import com.specup.mongeul.domain.diary.dto.request.DiaryCreateRequest;
import com.specup.mongeul.domain.diary.dto.request.DiaryUpdateRequest;
import com.specup.mongeul.domain.diary.dto.response.DiaryResponse;
import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.repository.DiaryRepository;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;

    @Transactional
    public DiaryResponse create(DiaryCreateRequest request) {
        Diary diary = diaryRepository.save(
                Diary.create(request.getTitle(), request.getContent(), request.isLocked(),
                        request.getPicture(), request.getWeather(), request.getFeeling(),
                        request.getIsPrivate())
        );
        return DiaryResponse.from(diary);
    }

    @Transactional
    public DiaryResponse update(Long diaryId, DiaryUpdateRequest request) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        diary.update(request.getTitle(), request.getContent(), request.isLocked(),
                request.getPicture(), request.getWeather(), request.getFeeling(),
                request.getIsPrivate());
        return DiaryResponse.from(diary);
    }

    @Transactional(readOnly = true)
    public DiaryResponse read(Long diaryId) {
        return DiaryResponse.from(diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND)));
    }

    @Transactional
    public void delete(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        diary.delete();
        diaryRepository.save(diary);
    }
}
