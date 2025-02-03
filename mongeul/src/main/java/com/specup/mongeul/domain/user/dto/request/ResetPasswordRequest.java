package com.specup.mongeul.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResetPasswordRequest {
    @NotBlank(message = "아이디는 필수 입력값입니다")
    private String userId;

    @NotBlank(message = "새 비밀번호는 필수 입력값입니다")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$",
            message = "비밀번호는 영문, 숫자, 특수문자 포함 8~20자리여야 합니다")
    private String newPassword;

    @NotBlank(message = "비밀번호 확인은 필수 입력값입니다")
    private String confirmPassword;
}