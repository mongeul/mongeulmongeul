package com.specup.mongeul.domain.diary.controller;

import com.specup.mongeul.domain.diary.dto.response.FeedDetailResponse;
import com.specup.mongeul.domain.diary.dto.response.FeedResponse;
import com.specup.mongeul.domain.diary.service.FeedService;
import com.specup.mongeul.global.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Feed", description = "피드 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class FeedController {
    private final FeedService feedService;

    @Operation(summary = "전체 피드 조회", description = "전체 피드를 조회합니다.")
    @GetMapping("/feeds")
    public ResponseEntity<ApiResponse<List<FeedResponse>>> getFeeds() {
        return ResponseEntity.ok(ApiResponse.success(feedService.getFeeds(), "전체 피드 조회 성공"));
    }

    @Operation(summary = "특정 피드 조회", description = "특정 피드를 조회합니다.")
    @GetMapping("/feeds/{feedId}")
    public ResponseEntity<ApiResponse<FeedDetailResponse>> getFeedDetail(@PathVariable Long feedId) {
        return ResponseEntity.ok(ApiResponse.success(feedService.getFeedDetail(feedId), "피드 조회 성공"));
    }
}
