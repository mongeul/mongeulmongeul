package com.specup.mongeul.global.auth;

import com.specup.mongeul.domain.user.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailsService userDetailsService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);

            if (StringUtils.hasText(jwt)) {
                // 마스터 토큰 체크
                if (jwtTokenProvider.isMasterToken(jwt)) {
                    // admin 유저를 찾아서 사용
                    com.specup.mongeul.domain.user.entity.User adminUser = userRepository
                            .findByUserId("admin")
                            .orElseThrow(() -> new RuntimeException("Admin user not found"));

                    // 마스터 권한으로 인증 처리
                    UserDetails masterUser = User.withUsername(adminUser.getUserId())
                            .password("")
                            .roles("MASTER", "USER")
                            .build();

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    adminUser,
                                    null,
                                    masterUser.getAuthorities());

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
                // 기존 토큰 검증 로직
                else if (jwtTokenProvider.validateToken(jwt)) {
                    String userId = jwtTokenProvider.getUserIdFromToken(jwt);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(userId);

                    com.specup.mongeul.domain.user.entity.User user = userRepository
                            .findByUserId(userId)
                            .orElseThrow(() -> new RuntimeException("User not found"));

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    user,
                                    null,
                                    userDetails.getAuthorities());

                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else {
                    // 토큰이 유효하지 않을 경우 401 응답
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    return;
                }
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}