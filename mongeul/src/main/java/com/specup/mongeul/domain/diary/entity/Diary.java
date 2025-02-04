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
}