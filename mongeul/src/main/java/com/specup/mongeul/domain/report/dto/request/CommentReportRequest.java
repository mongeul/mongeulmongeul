package com.specup.mongeul.domain.report.dto.request;

import com.specup.mongeul.domain.comment.entity.Comment;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CommentReportRequest {
    private Long commentId;
}
