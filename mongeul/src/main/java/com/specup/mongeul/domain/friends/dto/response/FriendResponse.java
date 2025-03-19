package com.specup.mongeul.domain.friends.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class FriendResponse {
    private Long friendId;
    private String nickname;
    private int diaryCount;
    private long daysFromStart;
    private boolean isWriter;
    private LocalDate recentWriteDate;

    public static FriendResponse of(Long friendId, String nickname, int diaryCount, long daysFromStart, boolean isWriter, LocalDate recentWriteDate) {
        return FriendResponse.builder()
                .friendId(friendId)
                .nickname(nickname)
                .diaryCount(diaryCount)
                .daysFromStart(daysFromStart)
                .isWriter(isWriter)
                .recentWriteDate(recentWriteDate)
                .build();
    }
}