package com.specup.mongeul.domain.comment.dto.response;

import com.specup.mongeul.domain.comment.entity.Comment;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class CommentResponse {
    private Long commentId;
    private String content;
    private Long parentCommentId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static CommentResponse from(Comment comment) {
        CommentResponse response = new CommentResponse();
        response.commentId = comment.getId();
        response.content = comment.getContent();
        response.parentCommentId = comment.getParentComment() == null ? null : comment.getParentComment().getId();
        response.createdAt = comment.getCreatedAt();
        response.modifiedAt = comment.getModifiedAt();
        return response;
    }
}
