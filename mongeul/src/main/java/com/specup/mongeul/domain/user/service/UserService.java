package com.specup.mongeul.domain.user.service;

import com.specup.mongeul.domain.user.dto.request.*;
import com.specup.mongeul.domain.user.dto.response.*;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.auth.JwtTokenProvider;
import com.specup.mongeul.global.auth.TokenBlacklistService;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final TokenBlacklistService tokenBlacklistService;

    @Transactional
    public UserJoinResponse join(UserJoinRequest request) {
        // 아이디 중복 검사
        if (userRepository.existsByUserId(request.getUserId())) {
            throw new CustomException(ErrorCode.DUPLICATE_USER_ID);
        }

        // 이메일 중복 검사
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new CustomException(ErrorCode.DUPLICATE_EMAIL);
        }

        // User 엔티티 생성 및 저장
        User user = User.builder()
                .userId(request.getUserId())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .email(request.getEmail())
                .birthday(request.getBirthday())
                .phoneNumber(request.getPhoneNumber())
                .profileImage(request.getProfileImage())
                .role(request.getRole())
                .build();

        User savedUser = userRepository.save(user);

        return new UserJoinResponse(savedUser.getUserId());
    }

    public boolean checkDuplicateId(String userId) {
        return !userRepository.existsByUserId(userId);
    }

    public boolean checkDuplicateEmail(String email) {
        return !userRepository.existsByEmail(email);
    }

    @Transactional
    public void logout(String token) {
        tokenBlacklistService.addToBlacklist(token);
    }

    @Transactional
    public LoginResponse login(LoginRequest request) {
        // 사용자 조회
        User user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 비밀번호 검증
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new CustomException(ErrorCode.INVALID_PASSWORD);
        }

        // 토큰 생성
        String accessToken = jwtTokenProvider.createAccessToken(user.getUserId());
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getUserId());

        return LoginResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Transactional
    public TokenRefreshResponse refreshToken(TokenRefreshRequest request) {
        String refreshToken = request.getRefreshToken();

        // 리프레시 토큰 유효성 검증
        if (!jwtTokenProvider.validateRefreshToken(refreshToken)) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 리프레시 토큰에서 사용자 ID 추출
        String userId = jwtTokenProvider.getUserIdFromToken(refreshToken);

        // 사용자 존재 여부 확인
        userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 새로운 액세스 토큰 발급
        String newAccessToken = jwtTokenProvider.createAccessToken(userId);
        // 새로운 리프레시 토큰 발급
        String newRefreshToken = jwtTokenProvider.createRefreshToken(userId);

        return TokenRefreshResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    public FindIdResponse findUserId(FindIdRequest request) {
        User user = userRepository.findByPhoneNumber(request.getPhoneNumber())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        return FindIdResponse.builder()
                .userId(user.getUserId())
                .build();
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new CustomException(ErrorCode.PASSWORD_MISMATCH);
        }

        User user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        user.updatePassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public UserUpdateResponse getMyInfo(User user) {
        return UserUpdateResponse.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .birthday(user.getBirthday())
                .phoneNumber(user.getPhoneNumber())
                .profileImage(user.getProfileImage())
                .role(user.getRole())
                .build();
    }

    @Transactional
    public UserUpdateResponse updateMyInfo(UserUpdateRequest request, User user) {
        // 이메일 중복 체크 (현재 사용자의 이메일은 제외)
        if (!user.getEmail().equals(request.getEmail()) &&
                userRepository.existsByEmail(request.getEmail())) {
            throw new CustomException(ErrorCode.DUPLICATE_EMAIL);
        }

        // 사용자 정보 업데이트
        user.update(
                request.getName(),
                request.getEmail(),
                request.getBirthday(),
                request.getPhoneNumber(),
                request.getProfileImage()
        );

        userRepository.save(user);

        return getMyInfo(user);
    }


    // 어드민 관련 method
    public Page<UserResponse> getUsers(Pageable pageable) {
        Page<User> userPage = userRepository.findAll(pageable);
        return userPage.map(UserResponse::from);
    }

    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        return UserResponse.from(user);
    }

    @Transactional
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        user.update(
                request.getName(),
                request.getEmail(),
                request.getBirthday(),
                request.getPhoneNumber(),
                request.getProfileImage()
        );

        // role 업데이트 추가
        if (request.getRole() != null) {
            user.updateRole(request.getRole());
        }

        return UserResponse.from(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 그 다음 사용자를 삭제
        userRepository.delete(user);
    }

    @Transactional
    public TestResponse test(TestRequest request) {
        return TestResponse.builder()
                .testResponse("요청 값 test 성공")
                .request(request)
                .build();
    }
}