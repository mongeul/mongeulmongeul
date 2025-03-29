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
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "diaries",
        indexes = {
            @Index(name = "idx_diaries_private_published_id", columnList = "private_status, published, id DESC"),
            @Index(name = "idx_diaries_user_date_published", columnList = "user_id, date, published"),
            @Index(name = "idx_diaries_user_published_date", columnList = "user_id, published, date DESC")
    }
)
@SQLDelete(sql = "UPDATE diaries SET deleted = true, deleted_at = CURRENT_TIME WHERE id = ?")
@SQLRestriction("deleted = false")
public class Diary extends BaseSoftDeleteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String picture;

    private LocalDate date;

    @Column(columnDefinition = "TEXT")
    private String pictureLines;

    @Enumerated(EnumType.STRING)
    private DiaryWeather weather;

    @Enumerated(EnumType.STRING)
    private DiaryFeeling feeling;

    @Enumerated(EnumType.STRING)
    private DiaryPrivate privateStatus;

    private Boolean published;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
    @BatchSize(size = 50)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DiaryEmoji> diaryEmojis = new ArrayList<>();

    public static Diary create(String title, String content, String picture,
                               LocalDate date, String pictureLines, DiaryWeather weather,
                               DiaryFeeling feeling, DiaryPrivate privateStatus, Boolean published,
                               User user) {
        Diary diary = new Diary();
        diary.title = title;
        diary.content = content;
        diary.picture = picture;
        diary.date = date;
        diary.pictureLines = pictureLines;
        diary.weather = weather;
        diary.feeling = feeling;
        diary.privateStatus = privateStatus;
        diary.published = published;
        diary.user = user;
        return diary;
    }

    public void update(String title, String content, String picture,
                       LocalDate date, String pictureLines, DiaryWeather weather,
                       DiaryFeeling feeling, DiaryPrivate privateStatus, Boolean published) {
        this.title = title;
        this.content = content;
        this.picture = picture;
        this.date = date;
        this.pictureLines = pictureLines;
        this.weather = weather;
        this.feeling = feeling;
        this.privateStatus = privateStatus;
        this.published = published;
    }
}