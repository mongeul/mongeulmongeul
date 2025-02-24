package com.specup.mongeul.domain.user.dto.request;

import jakarta.validation.constraints.Pattern;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LockPasswordRequest {
    @Pattern(regexp = "^[0-9]{4}$", message = "잠금 비밀번호는 4자리 숫자만 가능합니다")
    private String lockPassword;
}
