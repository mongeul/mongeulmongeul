package com.specup.mongeul.domain.user.dto.oauth;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NaverUserInfo {
    private String id;
    private String email;
    private String name;
    private String nickname;
    private String profileImage;
}