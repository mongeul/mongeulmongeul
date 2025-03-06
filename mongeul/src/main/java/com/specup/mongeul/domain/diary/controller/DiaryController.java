package com.specup.mongeul.domain.diary.controller;

import com.specup.mongeul.domain.diary.dto.request.Diary.DiaryCreateRequest;
import com.specup.mongeul.domain.diary.dto.request.Diary.DiaryDraftRequest;
import com.specup.mongeul.domain.diary.dto.request.Diary.DiaryUpdateRequest;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryDateResponse;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryDraftResponse;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryResponse;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryPictureLineResponse;
import com.specup.mongeul.domain.diary.service.DiaryService;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.ApiResponse;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
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

    @Operation(summary = "임시저장 일기목록 조회", description = "임시저장 된 일기목록을 조회합니다.")
    @GetMapping("/diaries/drafts")
    public ResponseEntity<ApiResponse<List<DiaryDraftResponse>>> getDraftDiaries(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.getDraftDiaries(user.getId()), "임시저장 일기 목록 조회 성공"));
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
    @PostMapping(value = "/diaries", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<DiaryResponse>> create(
            @AuthenticationPrincipal User user,
            @ModelAttribute DiaryCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.create(user.getId(), request), "일기 생성 성공"));
    }

    @Operation(summary = "일기 임시저장", description = "일기를 임시로 저장합니다.")
    @PostMapping("/diaries/drafts")
    public ResponseEntity<ApiResponse<DiaryDraftResponse>> saveDraft(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody DiaryDraftRequest request) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.saveDraft(user.getId(), request), "일기 임시저장 성공"));
    }

//    @Operation(summary = "일기 임시저장 -> 일기작성", description = "임시저장 된 일기로 일기를 작성합니다.")
//    @PostMapping("/diaries/{diaryId}/publish")
//    public ResponseEntity<ApiResponse<DiaryResponse>> publish(
//            @AuthenticationPrincipal User user,
//            @PathVariable Long diaryId) {
//        return ResponseEntity.ok(ApiResponse.success(diaryService.publish(user.getId(), diaryId), "임시저장 된 일기로 일기 생성 성공"));
//    }

    @Operation(summary = "일기 수정", description = "일기를 수정합니다.")
    @PutMapping(value = "/diaries/{diaryId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<DiaryResponse>> update(
            @AuthenticationPrincipal User user,
            @PathVariable Long diaryId,
            @ModelAttribute DiaryUpdateRequest request) {
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
    @GetMapping("/diaries/{diaryId}/picture-lines")
    public ResponseEntity<ApiResponse<DiaryPictureLineResponse>> getPictureLines(
            @AuthenticationPrincipal User user,
            @PathVariable Long diaryId) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.readPicture(diaryId), "그림 조회 성공"));
    }

    @Operation(summary = "날짜 조회", description = "일기 작성한 날짜들을 조회합니다.")
    @GetMapping("/diaries/date")
    public ResponseEntity<ApiResponse<List<DiaryDateResponse>>> getDiaryDates(
            @AuthenticationPrincipal User user,
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(ApiResponse.success(diaryService.getDates(user.getId(), year, month), "일기 작성날짜 목록 조회 성공"));
    }

    @Operation(summary = "날짜로 작성 일기 ID 조회", description = "해당 날짜 일기의 ID를 확인합니다.")
    @GetMapping("/diaries/find")
    public ResponseEntity<ApiResponse<Long>> getDiaryId(
            @AuthenticationPrincipal User user,
            @RequestParam LocalDate today) {
        Long diaryId = diaryService.getDiaryId(user.getId(), today);
        return ResponseEntity.ok(ApiResponse.success(diaryId, diaryId != null ? "일기 ID 조회 성공" : "해당 날짜에 작성된 날짜 없음"));
    }
}
