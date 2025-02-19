package com.specup.mongeul.domain.report.controller;

import com.specup.mongeul.domain.report.dto.request.CommentReportRequest;
import com.specup.mongeul.domain.report.dto.response.CommentReportResponse;
import com.specup.mongeul.domain.report.service.CommentReportService;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Report", description = "댓글 신고 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class CommentReportController {
    private final CommentReportService commentReportService;

    @Operation(summary = "댓글 신고", description = "댓글을 신고합니다.")
    @PostMapping("/comments/report")
    public ResponseEntity<ApiResponse<CommentReportResponse>> report(
            @AuthenticationPrincipal User reporter,
            @RequestBody @Valid CommentReportRequest request) {
        return ResponseEntity.ok(
                ApiResponse.success(commentReportService.report(reporter.getId(), request), "해당 댓글이 신고되었습니다."));
    }
}
