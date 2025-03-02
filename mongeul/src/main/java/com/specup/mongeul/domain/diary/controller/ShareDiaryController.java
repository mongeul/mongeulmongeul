package com.specup.mongeul.domain.diary.controller;

import com.specup.mongeul.domain.diary.dto.request.ShareDiary.ShareDiaryCreateRequest;
import com.specup.mongeul.domain.diary.dto.request.ShareDiary.ShareDiaryUpdateRequest;
import com.specup.mongeul.domain.diary.dto.response.ShareDiary.ShareDiaryDateResponse;
import com.specup.mongeul.domain.diary.dto.response.ShareDiary.ShareDiaryPictureLineResponse;
import com.specup.mongeul.domain.diary.dto.response.ShareDiary.ShareDiaryResponse;
import com.specup.mongeul.domain.diary.service.ShareDiaryService;
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

@Tag(name = "ShareDiary", description = "공유일기 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ShareDiaryController {
    private final ShareDiaryService shareDiaryService;

    // 공유일기 작성
    @Operation(summary = "공유일기 작성", description = "공유일기를 작성합니다.")
    @PostMapping("/groups/{groupId}/share-diaries")
    public ResponseEntity<ApiResponse<ShareDiaryResponse>> create(
            @AuthenticationPrincipal User user,
            @PathVariable Long groupId,
            @Valid @RequestBody ShareDiaryCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(shareDiaryService.create(user.getId(), groupId, request), "공유일기 작성 성공"));
    }

    // 공유일기 임시저장
    @Operation(summary = "공유일기 임시저장", description = "공유일기를 임시저장 합니다.")
    @PostMapping("/groups/{groupId}/share-diaries/drafts")
    public ResponseEntity<ApiResponse<ShareDiaryResponse>> draft(
            @AuthenticationPrincipal User user,
            @PathVariable Long groupId,
            ShareDiaryCreateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(shareDiaryService.saveDraft(user.getId(), groupId, request), "공유일기 임시저장 성공"));
    }

    // 공유일기 수정
    @Operation(summary = "공유일기 수정", description = "공유일기를 수정합니다.")
    @PutMapping("/groups/{groupId}/share-diaries/{shareDiaryId}")
    public ResponseEntity<ApiResponse<ShareDiaryResponse>> update(
            @AuthenticationPrincipal User user,
            @PathVariable Long groupId,
            @PathVariable Long shareDiaryId,
            @Valid @RequestBody ShareDiaryUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.success(shareDiaryService.update(user.getId(), groupId, shareDiaryId, request), "공유일기 수정 성공"));
    }

    // 공유일기 목록 조회
    @Operation(summary = "공유일기 목록 조회(캘린더)", description = "공유일기 목록을 조회합니다.")
    @GetMapping("/groups/{groupId}/share-diaries")
    public ResponseEntity<ApiResponse<List<ShareDiaryResponse>>> getCalendarShareDiaries(
            @AuthenticationPrincipal User user,
            @PathVariable Long groupId,
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(ApiResponse.success(shareDiaryService.getCalendarShareDiaries(groupId, year, month), "공유일기 목록 조회 성공"));
    }

    // 공유일기 임시저장 목록 조회

    // 특정 공유일기 조회
    @Operation(summary = "특정 공유일기 조회", description = "특정 공유일기를 조회합니다.")
    @GetMapping("/share-diaries/{shareDiaryId}")
    public ResponseEntity<ApiResponse<ShareDiaryResponse>> read(
            @AuthenticationPrincipal User user,
            @PathVariable Long shareDiaryId) {
        return ResponseEntity.ok(ApiResponse.success(shareDiaryService.read(shareDiaryId), "공유일기 조회 성공"));
    }

    // 공유일기 삭제
    @Operation(summary = "공유일기 삭제", description = "공유일기를 삭제합니다.")
    @DeleteMapping("/share-diaries/{shareDiaryId}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @AuthenticationPrincipal User user,
            @PathVariable Long shareDiaryId) {
        shareDiaryService.delete(user.getId(), shareDiaryId);
        return ResponseEntity.noContent().build();
    }

    // 공유일기 그림 조회
    @Operation(summary = "공유일기 그림 조회", description = "그림(pictureLines)을 조회 합니다.")
    @GetMapping("/share-diaries/{shareDiaryId}/picture-lines")
    public ResponseEntity<ApiResponse<ShareDiaryPictureLineResponse>> getPictureLines(
            @AuthenticationPrincipal User user,
            @PathVariable Long shareDiaryId) {
        return ResponseEntity.ok(ApiResponse.success(shareDiaryService.readPicture(shareDiaryId), "그림 조회 성공"));
    }

    // 공유일기 작성날짜 목록 조회
    @Operation(summary = "공유일기 작성날짜 목록 조회", description = "그룹의 공유일기가 작성된 날짜 목록을 조회합니다.")
    @GetMapping("/groups/{groupId}/share-diaries/date")
    public ResponseEntity<ApiResponse<List<ShareDiaryDateResponse>>> getShareDiaryDates(
            @AuthenticationPrincipal User user,
            @PathVariable Long groupId,
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(ApiResponse.success(shareDiaryService.getDates(groupId, year, month), "공유일기 날짜 목록 조회 성공"));
    }
}
