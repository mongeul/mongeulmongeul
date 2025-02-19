package com.specup.mongeul.domain.report.dto.response;

import com.specup.mongeul.domain.report.entity.CommentReport;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CommentReportResponse {
    private Long reportId;
    private Long commentId;
    private Long reporterId;
    private Long reportedUserId;

    public static CommentReportResponse from(CommentReport commentReport) {
        CommentReportResponse response = new CommentReportResponse();
        response.reportId = commentReport.getId();
        response.commentId = commentReport.getComment().getId();
        response.reporterId = commentReport.getReporter().getId();
        response.reportedUserId = commentReport.getComment().getUser().getId();
        return response;
    }
}
