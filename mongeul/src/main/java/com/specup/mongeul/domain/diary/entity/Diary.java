package com.specup.mongeul.domain.diary.entity;

import com.specup.mongeul.global.common.BaseSoftDeleteEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "diaries")
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

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DiaryFeeling feeling;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DiaryPrivate isPrivate;

    public static Diary create(String title, String content, boolean isLocked,
                               String picture, DiaryWeather weather, DiaryFeeling feeling,
                               DiaryPrivate isPrivate) {
        Diary diary = new Diary();
        diary.title = title;
        diary.content = content;
        diary.isLocked = isLocked;
        diary.picture = picture;
        diary.weather = weather;
        diary.feeling = feeling;
        diary.isPrivate = isPrivate;
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
}