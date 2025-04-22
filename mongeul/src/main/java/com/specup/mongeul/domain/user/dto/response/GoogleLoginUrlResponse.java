package com.specup.mongeul.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GoogleLoginUrlResponse {
    private String loginUrl;
}