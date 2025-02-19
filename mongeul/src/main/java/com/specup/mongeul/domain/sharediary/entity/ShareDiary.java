package com.specup.mongeul.domain.sharediary.entity;

import com.specup.mongeul.domain.diary.entity.ENUM.DiaryFeeling;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryWeather;
import com.specup.mongeul.global.common.BaseSoftDeleteEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

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

    @Column(nullable = false, length = 50)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    private String picture;

    @Enumerated(EnumType.STRING)
    private DiaryWeather weather;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiaryFeeling feeling;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DiaryPrivate privateStatus;

    @Column(columnDefinition = "TINYINT DEFAULT 0", nullable = false)
    @ColumnDefault("0")
    private Integer turn;

    public static ShareDiary create(String title, String content, String picture,
                                    DiaryWeather weather, DiaryFeeling feeling,
                                    DiaryPrivate privateStatus, Integer turn) {
        ShareDiary shareDiary = new ShareDiary();
        shareDiary.title = title;
        shareDiary.content = content;
        shareDiary.picture = picture;
        shareDiary.weather = weather;
        shareDiary.feeling = feeling;
        shareDiary.privateStatus = privateStatus;
        shareDiary.turn = turn;
        return shareDiary;
    }

    public void update(ShareDiary shareDiary) {
        this.title = shareDiary.title;
        this.content = shareDiary.content;
        this.picture = shareDiary.picture;
        this.weather = shareDiary.weather;
        this.feeling = shareDiary.feeling;
        this.privateStatus = shareDiary.privateStatus;
        this.turn = shareDiary.turn;
    }
}
