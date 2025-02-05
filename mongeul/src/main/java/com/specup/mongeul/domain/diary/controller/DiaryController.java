package com.specup.mongeul.domain.diary.controller;

import com.specup.mongeul.domain.diary.dto.request.DiaryCreateRequest;
import com.specup.mongeul.domain.diary.dto.request.DiaryUpdateRequest;
import com.specup.mongeul.domain.diary.dto.response.DiaryResponse;
import com.specup.mongeul.domain.diary.service.DiaryService;
import com.specup.mongeul.global.common.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class DiaryController {
    private final DiaryService diaryService;

    @GetMapping("/diaries/{diaryId}")
    public ResponseEntity<ApiResponse<DiaryResponse>> read(@PathVariable Long diaryId) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.read(diaryId), "일기 조회 성공"));
    }

    @PostMapping("/diaries")
    public ResponseEntity<ApiResponse<DiaryResponse>> create(@Valid @RequestBody DiaryCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.create(request), "일기 생성 성공"));
    }

    @PutMapping("/diaries/{diaryId}")
    public ResponseEntity<ApiResponse<DiaryResponse>> update(@PathVariable Long diaryId, @Valid @RequestBody DiaryUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.update(diaryId, request), "일기 수정 성공"));
    }

    @DeleteMapping("/diaries/{diaryId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long diaryId) {
        diaryService.delete(diaryId);
        return ResponseEntity.noContent().build();
    }
}
