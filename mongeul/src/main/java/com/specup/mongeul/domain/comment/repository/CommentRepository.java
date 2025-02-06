package com.specup.mongeul.domain.comment.repository;

import com.specup.mongeul.domain.comment.entity.Comment;
import com.specup.mongeul.domain.diary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByDiary(Diary diary);
}
