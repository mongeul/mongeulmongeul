package com.specup.mongeul.domain.comment.repository;

import com.specup.mongeul.domain.comment.entity.Comment;
import com.specup.mongeul.domain.diary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByDiary(Diary diary);

    int countByParentCommentId(Long parentCommentId);

//    @Query(
//            value = "select count(*) from (" +
//                    "   select comment_id from comment " +
//                    "   where parent_comment_id = :parentCommentId " +
//                    "   limit :limit " +
//                    ") t",
//            nativeQuery = true
//    )
//    Long countBy(
//            @Param("parentCommentId") Long parentCommentId,
//            @Param("limit") Long limit
//    );
}
