package com.specup.mongeul.domain.comment.entity;

import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.BaseSoftDeleteEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "comments")
@SQLDelete(sql = "UPDATE comments SET is_deleted = true, deleted_at = CURRENT_TIME WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Comment extends BaseSoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 300)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id", nullable = false)
    private Diary diary;

    public static Comment create(String content, User user, Diary diary) {
        Comment comment = new Comment();
        comment.content = content;
        comment.user = user;
        comment.diary = diary;
        return comment;
    }

    public void update(String content) {
        this.content = content;
    }
}
