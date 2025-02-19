package com.specup.mongeul.domain.report.service;

import com.specup.mongeul.domain.comment.entity.Comment;
import com.specup.mongeul.domain.comment.repository.CommentRepository;
import com.specup.mongeul.domain.report.dto.request.CommentReportRequest;
import com.specup.mongeul.domain.report.dto.response.CommentReportResponse;
import com.specup.mongeul.domain.report.entity.CommentReport;
import com.specup.mongeul.domain.report.repository.CommentReportRepository;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentReportService {
    private final CommentReportRepository commentReportRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Transactional
    public CommentReportResponse report(Long userId, CommentReportRequest request) {
        User reporter = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Comment comment = commentRepository.findById(request.getCommentId())
                .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));
        User reportedUser = comment.getUser();

        if (commentReportRepository.existsByCommentAndReporter(comment, reporter)) {
            throw new CustomException(ErrorCode.ALREADY_REPORTED);
        }

        CommentReport report = CommentReport.create(comment, reporter);
        commentReportRepository.save(report);

        reportedUser.increaseReportCount();
        return CommentReportResponse.from(report);
    }
}
