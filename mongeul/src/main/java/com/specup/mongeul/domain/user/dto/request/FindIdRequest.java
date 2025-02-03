package com.specup.mongeul.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FindIdRequest {
    @NotBlank(message = "휴대폰 번호는 필수 입력값입니다")
    private String phoneNumber;
}