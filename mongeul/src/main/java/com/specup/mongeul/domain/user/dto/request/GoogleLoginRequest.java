package com.specup.mongeul.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GoogleLoginRequest {
    @NotBlank(message = "인증 코드는 필수입니다.")
    private String code;
}