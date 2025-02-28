package com.specup.mongeul.domain.diary.controller;

import com.specup.mongeul.domain.diary.dto.request.Diary.DiaryCreateRequest;
import com.specup.mongeul.domain.diary.dto.request.Diary.DiaryUpdateRequest;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryDateResponse;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryResponse;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryPictureLineResponse;
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

    @Operation(summary = "캘린더에서 일기 조회", description = "내가 작성한 일기를 월 별로 조회합니다.")
    @GetMapping("/diaries")
    public ResponseEntity<ApiResponse<List<DiaryResponse>>> getCalendarDiaries(
            @AuthenticationPrincipal User user,
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.getCalendarDiaries(user.getId(), year, month), "내가 작성한 일기 목록 조회 성공"));
    }

    @Operation(summary = "특정 일기 조회", description = "일기를 조회합니다.")
    @GetMapping("/diaries/{diaryId}")
    public ResponseEntity<ApiResponse<DiaryResponse>> read(
            @AuthenticationPrincipal User user,
            @PathVariable Long diaryId,
            @RequestParam(value = "lockPassword", required = false) String lockPassword) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.read(user.getId(), diaryId, lockPassword), "일기 조회 성공"));
    }

    @Operation(summary = "일기 작성", description = "일기를 작성합니다.")
    @PostMapping("/diaries")
    public ResponseEntity<ApiResponse<DiaryResponse>> create(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody DiaryCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.create(user.getId(), request), "일기 생성 성공"));
    }

    @Operation(summary = "일기 수정", description = "일기를 수정합니다.")
    @PutMapping("/diaries/{diaryId}")
    public ResponseEntity<ApiResponse<DiaryResponse>> update(
            @AuthenticationPrincipal User user,
            @PathVariable Long diaryId,
            @Valid @RequestBody DiaryUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.update(user.getId(), diaryId, request), "일기 수정 성공"));
    }

    @Operation(summary = "일기 삭제", description = "일기를 삭제합니다.")
    @DeleteMapping("/diaries/{diaryId}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @AuthenticationPrincipal User user,
            @PathVariable Long diaryId) {
        diaryService.delete(user.getId(), diaryId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "그림 조회", description = "그림을 조회합니다.")
    @GetMapping("/diaries/{diaryId}/pictureLines")
    public ResponseEntity<ApiResponse<DiaryPictureLineResponse>> getPictureLines(
            @AuthenticationPrincipal User user,
            @PathVariable Long diaryId) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.readPicture(diaryId), "그림 조회 성공"));
    }

    @Operation(summary = "날짜 조회", description = "일기 작성한 날짜들을 조회합니다.")
    @GetMapping("/diaries/date")
    public ResponseEntity<ApiResponse<List<DiaryDateResponse>>> getDiaryDate(
            @AuthenticationPrincipal User user,
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.getDates(user.getId(), year, month), "일기 작성날짜 목록 조회 성공"));
    }
}
