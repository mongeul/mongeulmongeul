package com.specup.mongeul.domain.diary.service;

import com.specup.mongeul.domain.diary.dto.response.DiaryEmojiResponse;
import com.specup.mongeul.domain.diary.dto.response.FeedDetailResponse;
import com.specup.mongeul.domain.diary.dto.response.FeedResponse;
import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.repository.DiaryRepository;
import com.specup.mongeul.domain.diaryemoji.repository.DiaryEmojiRepository;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedService {
    private final DiaryRepository diaryRepository;
    private final DiaryEmojiRepository diaryEmojiRepository;

    @Transactional(readOnly = true)
    public List<FeedResponse> getFeeds() {
        List<Diary> feeds = diaryRepository.findByIsPrivate(DiaryPrivate.PUBLIC);
        return feeds.stream()
                .map(FeedResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public FeedDetailResponse getFeedDetail(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        List<DiaryEmojiResponse> emojis = diaryEmojiRepository.findEmojiCountByDiaryId(diaryId);
        return FeedDetailResponse.from(diary, emojis);
    }
}
