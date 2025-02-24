package com.specup.mongeul.domain.friends.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FriendNicknameResponse {
    private String nickname;
}