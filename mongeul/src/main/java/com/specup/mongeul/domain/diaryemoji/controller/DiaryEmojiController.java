package com.specup.mongeul.domain.diaryemoji.controller;

import com.specup.mongeul.domain.diaryemoji.service.DiaryEmojiService;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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

    @Operation(summary = "이모지 추가", description = "이모지를 추가합니다.")
    @PostMapping("/feeds/{feedId}/emojis/{emojiId}")
    public ResponseEntity<ApiResponse<Void>> addEmoji(
            @AuthenticationPrincipal User user,
            @PathVariable Long feedId,
            @PathVariable Long emojiId) {
        diaryEmojiService.addEmoji(feedId, emojiId, user.getId());
        return ResponseEntity.ok(ApiResponse.success(null, "이모지 추가 성공"));
    }

    @Operation(summary = "이모지 삭제", description = "이모지를 삭제합니다.")
    @DeleteMapping("/feeds/{feedId}/emojis/{emojiId}")
    public ResponseEntity<ApiResponse<Void>> deleteEmoji(
            @AuthenticationPrincipal User user,
            @PathVariable Long feedId,
            @PathVariable Long emojiId) {
        diaryEmojiService.deleteEmoji(feedId, emojiId, user.getId());
        return ResponseEntity.noContent().build();
    }
}
