package com.specup.mongeul.domain.emoji.config;

import com.specup.mongeul.domain.emoji.entity.ENUM.EmojiType;
import com.specup.mongeul.domain.emoji.entity.Emoji;
import com.specup.mongeul.domain.emoji.repository.EmojiRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmojiInitializer {
    private final EmojiRepository emojiRepository;

    @PostConstruct
    public void init() {
        if (emojiRepository.count() == 0) {
            for (EmojiType type : EmojiType.values()) {
                Emoji emoji = Emoji.create(type);
                emojiRepository.save(emoji);
            }
        }
    }
}
