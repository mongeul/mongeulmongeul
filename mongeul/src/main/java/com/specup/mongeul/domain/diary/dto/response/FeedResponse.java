package com.specup.mongeul.domain.diary.dto.response;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@ToString
public class FeedResponse {
    private Long feedId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
