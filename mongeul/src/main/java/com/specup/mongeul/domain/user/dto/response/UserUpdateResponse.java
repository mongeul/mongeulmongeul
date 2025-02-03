package com.specup.mongeul.domain.user.dto.response;

import com.specup.mongeul.domain.user.entity.UserRole;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserUpdateResponse {
    private String userId;
    private String name;
    private String email;
    private String birthday;
    private String phoneNumber;
    private String profileImage;
    private UserRole role;
}