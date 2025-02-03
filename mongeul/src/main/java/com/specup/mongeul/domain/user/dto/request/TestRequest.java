package com.specup.mongeul.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TestRequest {
    @NotBlank(message = "test용 값은 필수 입력값입니다.")
    private String testRequest;
}
