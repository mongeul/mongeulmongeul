package com.specup.mongeul.domain.friends.entity;

import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.BaseSoftDeleteEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE friends SET deleted = true, deleted_at = CURRENT_TIME WHERE id = ?")
@Table(name = "friends",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_friend_relationship",
                        columnNames = {"user_id", "friend_id"}
                )
        }
)
@SQLRestriction("deleted = false")
public class Friend extends BaseSoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "friend_id", nullable = false)
    private User friend;

    @Column(nullable = false)
    private Short status = 0;

    @Column(nullable = false)
    private Integer count = 0;

    public static Friend create(User user, User friend) {
        Friend friendRelation = new Friend();
        friendRelation.user = user;
        friendRelation.friend = friend;
        friendRelation.status = 0;
        friendRelation.count = 0;
        return friendRelation;
    }

    public void updateStatus(Short status) {
        this.status = status;
    }

    public void incrementCount() {
        this.count++;
    }
}