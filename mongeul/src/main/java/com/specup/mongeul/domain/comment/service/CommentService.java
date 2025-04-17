package com.specup.mongeul.domain.comment.service;

import com.specup.mongeul.domain.comment.dto.request.CommentCreateRequest;
import com.specup.mongeul.domain.comment.dto.request.CommentUpdateRequest;
import com.specup.mongeul.domain.comment.dto.response.CommentResponse;
import com.specup.mongeul.domain.comment.entity.Comment;
import com.specup.mongeul.domain.comment.repository.CommentRepository;
import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.repository.DiaryRepository;
import com.specup.mongeul.domain.notification.service.NotificationService;
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
    private final NotificationService notificationService;

    @Transactional
    public CommentResponse create(Long userId, Long diaryId, CommentCreateRequest request) {
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
        
        // 댓글 알림 생성 - 본인 일기에 댓글을 단 경우는 제외
        User diaryOwner = diary.getUser();
        if (!diaryOwner.getId().equals(userId)) {
            notificationService.createCommentNotification(diaryOwner, user.getNickname(), diaryId);
        }
        
        // 대댓글 알림 생성 - 본인 댓글에 대댓글을 단 경우는 제외
        if (parentComment != null && !parentComment.getUser().getId().equals(userId)) {
            notificationService.createCommentNotification(parentComment.getUser(), user.getNickname(), diaryId);
        }
        
        return CommentResponse.from(comment);
    }

    private Comment findParentComment(CommentCreateRequest request) {
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
    public CommentResponse update(Long userId, Long commentId, CommentUpdateRequest request) {
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
