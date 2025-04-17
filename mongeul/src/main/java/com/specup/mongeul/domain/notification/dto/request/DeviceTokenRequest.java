package com.specup.mongeul.domain.notification.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DeviceTokenRequest {
    
    @NotBlank(message = "토큰은 필수입니다.")
    private String token;
}