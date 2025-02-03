package com.specup.mongeul.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginRequest {

    @NotBlank(message = "아이디는 필수 입력값입니다")
    private String userId;

    @NotBlank(message = "비밀번호는 필수 입력값입니다")
    private String password;
}