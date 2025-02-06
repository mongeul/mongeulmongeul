package com.specup.mongeul.domain.diary.controller;

import com.specup.mongeul.domain.diary.dto.request.DiaryCreateRequest;
import com.specup.mongeul.domain.diary.dto.request.DiaryUpdateRequest;
import com.specup.mongeul.domain.diary.dto.response.DiaryResponse;
import com.specup.mongeul.domain.diary.service.DiaryService;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Diary", description = "일기 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class DiaryController {
    private final DiaryService diaryService;

    @Operation(summary = "내가 작성한 모든 일기 조회", description = "내가 작성한 모든 일기를 조회합니다.")
    @GetMapping("/diaries/me")
    public ResponseEntity<ApiResponse<List<DiaryResponse>>> getMyDiaries(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.getMyDiaries(user.getId()), "내가 작성한 모든 일기 조회 성공"));
    }

    @Operation(summary = "특정 일기 조회", description = "일기를 조회합니다.")
    @GetMapping("/diaries/{diaryId}")
    public ResponseEntity<ApiResponse<DiaryResponse>> read(@PathVariable Long diaryId) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.read(diaryId), "일기 조회 성공"));
    }

    @Operation(summary = "일기 작성", description = "일기를 작성합니다.")
    @PostMapping("/diaries")
    public ResponseEntity<ApiResponse<DiaryResponse>> create(@AuthenticationPrincipal User user, @Valid @RequestBody DiaryCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.create(user.getId(), request), "일기 생성 성공"));
    }

    @Operation(summary = "일기 수정", description = "일기를 수정합니다.")
    @PutMapping("/diaries/{diaryId}")
    public ResponseEntity<ApiResponse<DiaryResponse>> update(@PathVariable Long diaryId, @Valid @RequestBody DiaryUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.update(diaryId, request), "일기 수정 성공"));
    }

    @Operation(summary = "일기 삭제", description = "일기를 삭제합니다.")
    @DeleteMapping("/diaries/{diaryId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long diaryId) {
        diaryService.delete(diaryId);
        return ResponseEntity.noContent().build();
    }
}
