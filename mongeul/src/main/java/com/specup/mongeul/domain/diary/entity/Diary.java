package com.specup.mongeul.domain.diary.entity;

import com.specup.mongeul.domain.comment.entity.Comment;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import com.specup.mongeul.domain.diaryemoji.entity.DiaryEmoji;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.BaseSoftDeleteEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "diaries",
        indexes = {
            @Index(name = "idx_diary_private_id", columnList = "is_private, id DESC")
        }
)
@SQLDelete(sql = "UPDATE diaries SET deleted = true, deleted_at = CURRENT_TIME WHERE id = ?")
@SQLRestriction("deleted = false")
public class Diary extends BaseSoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private boolean isLocked;

    private String picture;

    @Enumerated(EnumType.STRING)
    private DiaryWeather weather;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiaryFeeling feeling;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiaryPrivate isPrivate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DiaryEmoji> diaryEmojis = new ArrayList<>();

    public static Diary create(String title, String content, boolean isLocked,
                               String picture, DiaryWeather weather, DiaryFeeling feeling,
                               DiaryPrivate isPrivate, User user) {
        Diary diary = new Diary();
        diary.title = title;
        diary.content = content;
        diary.isLocked = isLocked;
        diary.picture = picture;
        diary.weather = weather;
        diary.feeling = feeling;
        diary.isPrivate = isPrivate;
        diary.user = user;
        return diary;
    }

    public void update(String title, String content, boolean isLocked,
                       String picture, DiaryWeather weather, DiaryFeeling feeling,
                       DiaryPrivate isPrivate) {
        this.title = title;
        this.content = content;
        this.isLocked = isLocked;
        this.picture = picture;
        this.weather = weather;
        this.feeling = feeling;
        this.isPrivate = isPrivate;
    }

    public void lock() {
        this.isLocked = !this.isLocked;
    }
}