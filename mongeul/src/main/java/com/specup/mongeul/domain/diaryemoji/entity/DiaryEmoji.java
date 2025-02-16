package com.specup.mongeul.domain.diaryemoji.entity;

import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.emoji.entity.Emoji;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.global.common.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "diaries_emojis",
        indexes = {
                @Index(name = "idx_diary_emoji_group", columnList = "diary_id, emoji_id")
        },
        uniqueConstraints = {
            @UniqueConstraint(name = "idx_diary_emoji_user", columnNames = {"diary_id", "emoji_id", "user_id"})
        }
)
public class DiaryEmoji extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id", nullable = false)
    private Diary diary;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emoji_id", nullable = false)
    private Emoji emoji;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public static DiaryEmoji create(Diary diary, Emoji emoji, User user) {
        DiaryEmoji diaryAndEmoji = new DiaryEmoji();
        diaryAndEmoji.diary = diary;
        diaryAndEmoji.emoji = emoji;
        diaryAndEmoji.user = user;
        return diaryAndEmoji;
    }
}
