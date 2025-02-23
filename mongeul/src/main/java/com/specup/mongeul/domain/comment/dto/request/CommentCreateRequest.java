package com.specup.mongeul.domain.comment.dto.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CommentCreateRequest {
    private String content;
    private Long parentCommentId;
}
