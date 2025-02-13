package com.specup.mongeul.domain.emoji.entity;

import com.specup.mongeul.domain.diaryemoji.entity.DiaryEmoji;
import com.specup.mongeul.domain.emoji.entity.ENUM.EmojiType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "emojis")
public class Emoji {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EmojiType type;

    @OneToMany(mappedBy = "emoji", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DiaryEmoji> diaryEmojis = new ArrayList<>();

    protected Emoji(EmojiType type) {
        this.type = type;
    }

    public static Emoji create(EmojiType type) {
        return new Emoji(type);
    }
}
