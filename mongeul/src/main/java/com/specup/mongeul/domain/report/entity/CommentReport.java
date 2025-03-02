package com.specup.mongeul.domain.report.entity;

import com.specup.mongeul.domain.comment.entity.Comment;
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
@Table(name = "comment_report",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = {"comment_id", "user_id"})
        }
)
@SQLDelete(sql = "UPDATE comment_report SET deleted = true, deleted_at = CURRENT_TIME WHERE id = ?")
@SQLRestriction("deleted = false")
public class CommentReport extends BaseSoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id", nullable = false)
    private Comment comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User reporter;

    public static CommentReport create(Comment comment, User user) {
        CommentReport report = new CommentReport();
        report.comment = comment;
        report.reporter = user;
        return report;
    }
}
