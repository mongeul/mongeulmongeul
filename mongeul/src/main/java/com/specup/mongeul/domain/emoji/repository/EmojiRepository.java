package com.specup.mongeul.domain.emoji.repository;

import com.specup.mongeul.domain.emoji.entity.ENUM.EmojiType;
import com.specup.mongeul.domain.emoji.entity.Emoji;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmojiRepository extends JpaRepository<Emoji, Long> {

    Optional<Emoji> findByType(EmojiType type);
}
