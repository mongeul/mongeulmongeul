package com.specup.mongeul.domain.comment.controller;

import com.specup.mongeul.domain.comment.dto.request.CommentRequest;
import com.specup.mongeul.domain.comment.dto.response.CommentResponse;
import com.specup.mongeul.domain.comment.service.CommentService;
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

@Tag(name = "Comment", description = "댓글 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class CommentController {
    private final CommentService commentService;

    @Operation(summary = "일기의 댓글 조회", description = "특정 일기에 달린 댓글들을 조회합니다.")
    @GetMapping("/comments/{diaryId}")
    public ResponseEntity<ApiResponse<List<CommentResponse>>> read(@PathVariable Long diaryId) {
        return ResponseEntity.ok(ApiResponse.success(commentService.read(diaryId), "일기의 댓글 조회 성공"));
    }

    @Operation(summary = "댓글 생성", description = "댓글을 생성합니다.")
    @PostMapping("/diaries/{diaryId}/comments")
    public ResponseEntity<ApiResponse<CommentResponse>> create(@AuthenticationPrincipal User user, @PathVariable Long diaryId, @Valid @RequestBody CommentRequest request) {
        return ResponseEntity.ok(ApiResponse.success(commentService.create(user.getId(), diaryId, request), "댓글 생성 성공"));
    }

    @Operation(summary = "댓글 수정", description = "댓글을 수정합니다.")
    @PutMapping("/comments/{commentId}")
    public ResponseEntity<ApiResponse<CommentResponse>> update(@AuthenticationPrincipal User user, @PathVariable Long commentId, @Valid @RequestBody CommentRequest request) {
        return ResponseEntity.ok(ApiResponse.success(commentService.update(user.getId(), commentId, request), "댓글 수정 성공"));
    }

    @Operation(summary = "댓글 삭제", description = "댓글을 삭제합니다.")
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<ApiResponse<Void>> delete(@AuthenticationPrincipal User user, @PathVariable Long commentId) {
        commentService.delete(user.getId(), commentId);
        return ResponseEntity.noContent().build();
    }
}
