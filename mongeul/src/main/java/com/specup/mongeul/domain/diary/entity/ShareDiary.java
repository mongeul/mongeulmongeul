package com.specup.mongeul.domain.diary.entity;

import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import com.specup.mongeul.domain.friends.entity.Friend;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.BaseSoftDeleteEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "share_diaries")
@SQLDelete(sql = "UPDATE share_diaries SET deleted = true, deleted_at = CURRENT_TIME WHERE id = ?")
@SQLRestriction("deleted = false")
public class ShareDiary extends BaseSoftDeleteEntity {
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", nullable = false)
    private Friend group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id", nullable = false)
    private User writer;

    public static ShareDiary create(String title, String content, String picture,
                                    LocalDate date, String pictureLines, DiaryWeather weather,
                                    DiaryFeeling feeling, Friend group, User writer) {
        ShareDiary shareDiary = new ShareDiary();
        shareDiary.title = title;
        shareDiary.content = content;
        shareDiary.picture = picture;
        shareDiary.date = date;
        shareDiary.pictureLines = pictureLines;
        shareDiary.weather = weather;
        shareDiary.feeling = feeling;
        shareDiary.group = group;
        shareDiary.writer = writer;
        return shareDiary;
    }

    public void update(String title, String content, String picture,
                                    LocalDate date, String pictureLines, DiaryWeather weather,
                                    DiaryFeeling feeling) {
        this.title = title;
        this.content = content;
        this.picture = picture;
        this.date = date;
        this.pictureLines = pictureLines;
        this.weather = weather;
        this.feeling = feeling;
    }
}
