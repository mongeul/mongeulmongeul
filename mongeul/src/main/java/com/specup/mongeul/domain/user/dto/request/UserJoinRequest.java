package com.specup.mongeul.domain.user.dto.request;

import com.specup.mongeul.domain.user.entity.UserRole;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserJoinRequest {

    @NotBlank(message = "아이디는 필수 입력값입니다")
    @Pattern(regexp = "^[a-zA-Z0-9]{4,20}$", message = "아이디는 영문, 숫자 포함 4~20자리여야 합니다")
    private String userId;

    @NotBlank(message = "비밀번호는 필수 입력값입니다")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$",
            message = "비밀번호는 영문, 숫자, 특수문자 포함 8~20자리여야 합니다")
    private String password;

    @NotBlank(message = "이름은 필수 입력값입니다")
    private String name;

    @NotBlank(message = "이메일은 필수 입력값입니다")
    @Email(message = "이메일 형식이 올바르지 않습니다")
    private String email;

    @Schema(description = "생년월일(YYYYMMDD)")
    @Pattern(regexp = "^\\d{8}$", message = "생년월일은 8자리 숫자여야 합니다")
    private String birthday;

    @NotBlank(message = "휴대폰 번호는 필수 입력값입니다")
    private String phoneNumber;

    private String profileImage;
    private CompanyInfoRequest companyInfo;

    @NotNull(message = "마케팅 활용 동의 여부는 필수 입력값입니다")
    private Boolean marketingAgreed;

    private UserRole role;

    @Getter
    @NoArgsConstructor
    public static class CompanyInfoRequest {
        private String companyName;
        private String businessNumber;
        private String representativeName;
        private String address;
        private String addressDetail;
        private String businessType;
        private String businessItem;
        private String email;
    }
}