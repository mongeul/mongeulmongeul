package com.specup.mongeul.domain.user.dto.request;

import com.specup.mongeul.domain.user.entity.UserRole;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserUpdateRequest {
    @NotBlank(message = "이름은 필수입니다")
    private String name;

    @NotBlank(message = "이메일은 필수입니다")
    @Email(message = "올바른 이메일 형식이 아닙니다")
    private String email;

    @Schema(description = "생년월일(YYYYMMDD)")
    @Pattern(regexp = "^\\d{8}$", message = "생년월일은 8자리 숫자여야 합니다")
    private String birthday;

    @NotBlank(message = "휴대폰 번호는 필수입니다")
    private String phoneNumber;

    private String profileImage;

    private UserRole role;
}