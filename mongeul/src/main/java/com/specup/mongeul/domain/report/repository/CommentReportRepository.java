package com.specup.mongeul.domain.report.repository;

import com.specup.mongeul.domain.comment.entity.Comment;
import com.specup.mongeul.domain.report.entity.CommentReport;
import com.specup.mongeul.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentReportRepository extends JpaRepository<CommentReport, Long> {

    boolean existsByCommentAndReporter(Comment comment, User reporter);
}
