package com.specup.mongeul.domain.user.dto.oauth;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KakaoUserInfo {
    private String id;
    private String email;
}