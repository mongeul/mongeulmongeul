package com.specup.mongeul.domain.comment.service;

import com.specup.mongeul.domain.comment.dto.request.CommentRequest;
import com.specup.mongeul.domain.comment.dto.response.CommentResponse;
import com.specup.mongeul.domain.comment.entity.Comment;
import com.specup.mongeul.domain.comment.repository.CommentRepository;
import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.repository.DiaryRepository;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.function.Predicate.not;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public CommentResponse create(Long userId, Long diaryId, CommentRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        Comment parentComment = findParentComment(request);
        Comment comment = commentRepository.save(
                Comment.create(
                        request.getContent(),
                        parentComment,
                        user,
                        diary
                )
        );
        return CommentResponse.from(comment);
    }

    private Comment findParentComment(CommentRequest request) {
        Long parentCommentId = request.getParentCommentId();
        if (parentCommentId == null) {
            return null;
        }
        return commentRepository.findById(parentCommentId)
                .filter(not(Comment::getDeleted))
                .filter(Comment::isRoot)
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_COMMENT_PARENT));
    }

    @Transactional(readOnly = true)
    public List<CommentResponse> read(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        List<Comment> comments = commentRepository.findByDiary(diary);
        return comments.stream()
                .map(CommentResponse::from)
                .toList();
    }

    @Transactional
    public CommentResponse update(Long userId, Long commentId, CommentRequest request) {
        Comment comment = commentRepository.findById(commentId)
                .filter(not(Comment::getDeleted))
                .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));
        if (!comment.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.INVALID_COMMENT_USER);
        }
        comment.update(request.getContent());
        return CommentResponse.from(comment);
    }

    @Transactional
    public void delete(Long userId, Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .filter(not(Comment::getDeleted))
                .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));

        if (!comment.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.INVALID_COMMENT_USER);
        }

        if (hasChildren(comment)) {
            comment.softDelete();
        } else {
            hardDelete(comment);
        }
    }

    public boolean hasChildren(Comment comment) {
        return commentRepository.countByParentCommentId(comment.getId()) > 0;
    }

    public void hardDelete(Comment comment) {
        commentRepository.delete(comment);
        if (!comment.isRoot()) {
            commentRepository.findById(comment.getParentComment().getId())
                    .filter(Comment::getDeleted)
                    .filter(not(this::hasChildren))
                    .ifPresent(this::hardDelete);
        }
    }
}
