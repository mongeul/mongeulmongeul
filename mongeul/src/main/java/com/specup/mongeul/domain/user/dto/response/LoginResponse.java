package com.specup.mongeul.domain.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {
    private boolean success;
    private String message;
    private String accessToken;
    private String refreshToken;
    private UserInfo userInfo;

    @Getter
    @Builder
    public static class UserInfo {
        private String userId;
        private String name;
        private String email;
        private String phoneNumber;
        private String role;
        private CompanyInfo companyInfo;
    }

    @Getter
    @Builder
    public static class CompanyInfo {
        private String companyName;
        private String businessNumber;
        private String address;
    }
}