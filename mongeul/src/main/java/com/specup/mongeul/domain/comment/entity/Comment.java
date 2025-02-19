package com.specup.mongeul.domain.comment.entity;

import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "comments")
public class Comment extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 300)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id", nullable = false)
    private Diary diary;

    private Boolean deleted;
    private LocalDateTime deletedAt;

    public static Comment create(String content, Comment parent, User user, Diary diary) {
        Comment comment = new Comment();
        comment.content = content;
        comment.parentComment = parent;
        comment.user = user;
        comment.diary = diary;
        comment.deleted = false;
        return comment;
    }

    public void update(String content) {
        this.content = content;
    }

    public boolean isRoot() {
        return this.parentComment == null;
    }

    public void softDelete() {
        this.deleted = true;
        this.deletedAt = LocalDateTime.now();
        this.content = "작성자가 삭제한 댓글입니다.";
    }
}
