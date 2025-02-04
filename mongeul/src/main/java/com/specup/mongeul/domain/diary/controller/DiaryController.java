package com.specup.mongeul.domain.diary.controller;

import com.specup.mongeul.domain.diary.dto.request.DiaryCreateRequest;
import com.specup.mongeul.domain.diary.dto.request.DiaryUpdateRequest;
import com.specup.mongeul.domain.diary.dto.response.DiaryResponse;
import com.specup.mongeul.domain.diary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class DiaryController {
    private final DiaryService diaryService;

    @GetMapping("/diaries/{diaryId}")
    public DiaryResponse read(@PathVariable Long diaryId) {
        return diaryService.read(diaryId);
    }

    @PostMapping("/diaries")
    public DiaryResponse create(@RequestBody DiaryCreateRequest request) {
        return diaryService.create(request);
    }

    @PutMapping("/diaries/{diaryId}")
    public DiaryResponse update(@PathVariable Long diaryId, @RequestBody DiaryUpdateRequest request) {
        return diaryService.update(diaryId, request);
    }

    @DeleteMapping("/diaries/{diaryId}")
    public void delete(@PathVariable Long diaryId) {
        diaryService.delete(diaryId);
    }
}
