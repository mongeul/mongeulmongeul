package com.specup.mongeul.domain.user.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.entity.UserRole;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class UserResponse {
    private Long id;
    private String userId;
    private String name;
    private String email;
    private String phoneNumber;
    private String birthday;
    private String profileImage;
    private UserRole role;

    // 회사 정보
    private CompanyInfo companyInfo;

    // 마케팅 동의 관련 정보
    private boolean marketingAgreed;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime marketingAgreedAt;

    // 가입일
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @Getter
    @Builder
    public static class CompanyInfo {
        private String companyName;
        private String businessNumber;
        private String representativeName;
        private String address;
        private String addressDetail;
        private String businessType;
        private String businessItem;
        private String email;
    }

    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .birthday(user.getBirthday())
                .profileImage(user.getProfileImage())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }
}