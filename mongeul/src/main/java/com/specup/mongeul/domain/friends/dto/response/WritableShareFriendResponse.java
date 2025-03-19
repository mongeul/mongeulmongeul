package com.specup.mongeul.domain.friends.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class WritableShareFriendResponse {
    private Long friendId;
    private String nickname;

    public static WritableShareFriendResponse of(Long friendId, String nickname) {
        return WritableShareFriendResponse.builder()
                .friendId(friendId)
                .nickname(nickname)
                .build();
    }
}