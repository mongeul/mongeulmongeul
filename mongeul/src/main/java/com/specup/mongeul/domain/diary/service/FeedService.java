package com.specup.mongeul.domain.diary.service;

import com.specup.mongeul.domain.diaryemoji.dto.response.DiaryEmojiResponse;
import com.specup.mongeul.domain.diary.dto.response.Feed.FeedDetailResponse;
import com.specup.mongeul.domain.diary.dto.response.Feed.FeedResponse;
import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.repository.DiaryRepository;
import com.specup.mongeul.domain.diaryemoji.repository.DiaryEmojiRepository;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final DiaryRepository diaryRepository;
    private final DiaryEmojiRepository diaryEmojiRepository;

    @Transactional(readOnly = true)
    public List<FeedResponse> getFeedAll(Long userId, Long pageSize, Long lastDiaryId) {
        List<Diary> diaries = lastDiaryId == null ?
                diaryRepository.findAllInfiniteScroll(userId, pageSize) :
                diaryRepository.findAllInfiniteScroll(userId, lastDiaryId, pageSize);
        if (diaries.isEmpty()) {
            return List.of();
        }
        return diaries.stream()
                .map(FeedResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public FeedDetailResponse getFeedDetail(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        List<DiaryEmojiResponse> emojis = diaryEmojiRepository.findEmojiCountByDiaryId(diaryId);
        return FeedDetailResponse.from(diary, emojis);
    }
}
