package com.specup.mongeul.domain.diaryemoji.controller;

import com.specup.mongeul.domain.diaryemoji.dto.request.DiaryEmojiRequest;
import com.specup.mongeul.domain.diaryemoji.service.DiaryEmojiService;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Emoji", description = "이모지 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class DiaryEmojiController {
    private final DiaryEmojiService diaryEmojiService;

    @Operation(summary = "이모지 등록/삭제", description = "토글 형식의 이모지 등록 및 삭제")
    @PostMapping("/diaries/{diaryId}/emojis")
    public ResponseEntity<ApiResponse<Void>>add(@AuthenticationPrincipal User user, @PathVariable Long diaryId, @Valid @RequestBody DiaryEmojiRequest request) {
        boolean isAdded = diaryEmojiService.emojiToggle(user.getId(), diaryId, request);
        if (isAdded) {
            return ResponseEntity.ok(ApiResponse.success(null, "이모지 추가 성공"));
        } else {
            return ResponseEntity.ok(ApiResponse.success(null, "이모지 삭제 성공"));
        }
    }
}
