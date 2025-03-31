package com.specup.mongeul.domain.diary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.specup.mongeul.domain.diary.dto.common.PictureLineDto;
import com.specup.mongeul.domain.diary.dto.request.ShareDiary.ShareDiaryCreateRequest;
import com.specup.mongeul.domain.diary.dto.request.ShareDiary.ShareDiaryDraftRequest;
import com.specup.mongeul.domain.diary.dto.request.ShareDiary.ShareDiaryUpdateRequest;
import com.specup.mongeul.domain.diary.dto.response.ShareDiary.ShareDiaryDateResponse;
import com.specup.mongeul.domain.diary.dto.response.ShareDiary.ShareDiaryDraftResponse;
import com.specup.mongeul.domain.diary.dto.response.ShareDiary.ShareDiaryPictureLineResponse;
import com.specup.mongeul.domain.diary.dto.response.ShareDiary.ShareDiaryResponse;
import com.specup.mongeul.domain.diary.entity.ShareDiary;
import com.specup.mongeul.domain.diary.repository.ShareDiaryRepository;
import com.specup.mongeul.domain.friends.entity.Friend;
import com.specup.mongeul.domain.friends.repository.FriendRepository;
import com.specup.mongeul.domain.service.CloudinaryService;
import com.specup.mongeul.domain.service.GoogleDriveService;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShareDiaryService {
    private final ShareDiaryRepository shareDiaryRepository;
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;
    private final ObjectMapper objectMapper;
    private final GoogleDriveService googleDriveService;
    private final CloudinaryService cloudinaryService;

    // 공유일기 생성
    @Transactional
    public ShareDiaryResponse create(Long userId, Long groupId, ShareDiaryCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Friend group = friendRepository.findById(groupId)
                .orElseThrow(() -> new CustomException(ErrorCode.GROUP_NOT_FOUND));

        // 일기 하루 1개 검증
        if (shareDiaryRepository.existsByGroupAndDateAndPublished(group, request.getDate(), true)) {
            throw new CustomException(ErrorCode.SHARE_DIARY_ALREADY_EXISTS);
        }

        // 차례 검증
        ShareDiary lastDiary = shareDiaryRepository.findLatestByGroup(group);
        if (lastDiary != null && lastDiary.getWriter().equals(user)) {
            throw new CustomException(ErrorCode.INVALID_SHARE_DIARY_TURN);
        }

        MultipartFile picture = request.getPicture();
        // 그림 URL 생성
        String pictureUrl = null;
        String fileUrl = null;
        if (picture != null && !picture.isEmpty()) {
            try {
                // 임시 파일 생성 및 업로드
                java.io.File tempFile = java.io.File.createTempFile("temp-", null);
                picture.transferTo(tempFile);

                pictureUrl = googleDriveService.uploadFile(tempFile, picture.getContentType(), groupId, request.getDate(), false);
                fileUrl = cloudinaryService.uploadFile(tempFile, groupId, request.getDate(), false);

                // 파일 자동 삭제 (try-with-resources 활용)
                if (!tempFile.delete()) {
                    tempFile.getAbsolutePath();
                }
            } catch (Exception e) {
                throw new RuntimeException("파일 업로드 실패", e);
            }
        }

        ShareDiary shareDiary = shareDiaryRepository.save(
                ShareDiary.create(
                        request.getTitle(), request.getContent(), pictureUrl,
                        request.getDate(), request.getPictureLines(), request.getWeather(),
                        request.getFeeling(), true, group, user
                )
        );
        return ShareDiaryResponse.from(shareDiary);
    }

    // 공유일기 임시저장
    @Transactional
    public ShareDiaryDraftResponse saveDraft(Long userId, Long groupId, ShareDiaryDraftRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Friend group = friendRepository.findById(groupId)
                .orElseThrow(() -> new CustomException(ErrorCode.GROUP_NOT_FOUND));

        String pictureLinesJson = null;
        if (request.getPictureLines() != null && !request.getPictureLines().isEmpty()) {
            try {
                pictureLinesJson = objectMapper.writeValueAsString(request.getPictureLines());
            } catch (JsonProcessingException e) {
                throw new RuntimeException("PictureLines Json 직렬화 실패", e);
            }
        }

        ShareDiary shareDiary = shareDiaryRepository.save(
                ShareDiary.create(
                        request.getTitle(), request.getContent(), null,
                        request.getDate(), pictureLinesJson, request.getWeather(),
                        request.getFeeling(), false, group, user
                )
        );
        return ShareDiaryDraftResponse.from(shareDiary);
    }

    // 공유일기 수정
    @Transactional
    public ShareDiaryResponse update(Long userId, Long groupId, Long shareDiaryId, ShareDiaryUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Friend group = friendRepository.findById(groupId)
                .orElseThrow(() -> new CustomException(ErrorCode.GROUP_NOT_FOUND));
        ShareDiary shareDiary = shareDiaryRepository.findById(shareDiaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.SHARE_DIARY_NOT_FOUND));

        // 유저 검증
        if (!shareDiary.getWriter().getId().equals(userId)) {
            throw new CustomException(ErrorCode.INVALID_SHARE_DIARY_USER);
        }

        // 날짜 검증
        if (!shareDiary.getDate().equals(request.getDate()) && shareDiary.getPublished()) {
            if (shareDiaryRepository.existsByGroupAndDateAndPublished(group, request.getDate(), true)) {
                throw new CustomException(ErrorCode.SHARE_DIARY_ALREADY_EXISTS);
            }
        }

        // 차례 검증
        ShareDiary lastDiary = shareDiaryRepository.findLatestByGroup(group);
        boolean isOnlyDiary = shareDiaryRepository.countByGroupAndPublished(group, true) == 1;
        if (!isOnlyDiary && lastDiary != null && lastDiary.getWriter().equals(user) && shareDiary.getPublished()) {
            throw new CustomException(ErrorCode.SHARE_DIARY_NOT_UPDATE_DATE);
        }

        MultipartFile newPicture = request.getPicture();
        String pictureUrl = shareDiary.getPicture();
        String pictureUrl2 = shareDiary.getPicture();

        if (newPicture != null && !newPicture.isEmpty()) {
            try {
                // 새 이미지 업로드 (자동 덮어쓰기 로직 포함)
                java.io.File tempFile = java.io.File.createTempFile("temp-", null);
                newPicture.transferTo(tempFile);
                pictureUrl = googleDriveService.uploadFile(tempFile, newPicture.getContentType(), groupId, request.getDate(), false);
                pictureUrl2 = cloudinaryService.uploadFile(tempFile, groupId, request.getDate(), false);

                tempFile.delete();
            } catch (Exception e) {
                throw new RuntimeException("파일 업로드 실패", e);
            }
        } else {
            pictureUrl = null;
        }

        shareDiary.update(
                request.getTitle(), request.getContent(), pictureUrl,
                request.getDate(), request.getPictureLines(), request.getWeather(),
                request.getFeeling(), shareDiary.getPublished());

        return ShareDiaryResponse.from(shareDiary);
    }

    // 캘린더 공유일기 조회
    @Transactional(readOnly = true)
    public List<ShareDiaryResponse> getCalendarShareDiaries(Long groupId, int year, int month) {
        Friend group = friendRepository.findById(groupId)
                .orElseThrow(() -> new CustomException(ErrorCode.GROUP_NOT_FOUND));

        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        List<ShareDiary> shareDiaries = shareDiaryRepository.findByGroupAndDateBetween(group, startOfMonth, startOfNextMonth);
        return shareDiaries.stream()
                .map(ShareDiaryResponse::from)
                .toList();
    }

    // 공유일기 임시저장 목록 조회
    @Transactional(readOnly = true)
    public List<ShareDiaryDraftResponse> getDraftShareDiaries(Long userId, Long groupId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Friend group = friendRepository.findById(groupId)
                .orElseThrow(() -> new CustomException(ErrorCode.GROUP_NOT_FOUND));
        List<ShareDiary> shareDiaries = shareDiaryRepository.findByWriterAndGroupAndPublishedOrderByDateDesc(user, group, false);
        return shareDiaries.stream()
                .map(ShareDiaryDraftResponse::from)
                .toList();
    }

    // 특정 공유일기 조회
    @Transactional(readOnly = true)
    public ShareDiaryResponse read(Long shareDiaryId) {
        ShareDiary shareDiary = shareDiaryRepository.findById(shareDiaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.SHARE_DIARY_NOT_FOUND));
        return ShareDiaryResponse.from(shareDiary);
    }

    // 공유일기 삭제
    @Transactional
    public void delete(Long userId, Long shareDiaryId) {
        ShareDiary shareDiary = shareDiaryRepository.findById(shareDiaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.SHARE_DIARY_NOT_FOUND));
        if (!shareDiary.getWriter().getId().equals(userId)) {
            throw new CustomException(ErrorCode.INVALID_SHARE_DIARY_USER);
        }

        // Google Drive 이미지 삭제 (파일 URL이 있을 경우)
        if (shareDiary.getPicture() != null && shareDiary.getPicture().contains("id=")) {
            try {
                googleDriveService.deleteFile(shareDiary.getPicture());
            } catch (Exception e) {
                throw new RuntimeException("파일 삭제 실패", e);
            }
        }

        shareDiaryRepository.delete(shareDiary);
    }

    // 공유일기 그림 조회
    @Transactional(readOnly = true)
    public ShareDiaryPictureLineResponse readPicture(Long shareDiaryId) {
        ShareDiary shareDiary = shareDiaryRepository.findById(shareDiaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.SHARE_DIARY_NOT_FOUND));

        List<PictureLineDto> pictureLines = null;
        if (shareDiary.getPictureLines() != null && !shareDiary.getPictureLines().isEmpty()) {
            try {
                pictureLines = objectMapper.readValue(shareDiary.getPictureLines(),
                        objectMapper.getTypeFactory().constructCollectionType(List.class, PictureLineDto.class));
            } catch (JsonProcessingException e) {
                throw new RuntimeException("PictureLines JSON 역직렬화 실패", e);
            }
        }
        return ShareDiaryPictureLineResponse.from(shareDiary.getId(), pictureLines);
    }

    // 공유일기 작성 날짜 조회
    @Transactional(readOnly = true)
    public List<ShareDiaryDateResponse> getDates(Long groupId, int year, int month) {
        Friend group = friendRepository.findById(groupId)
                .orElseThrow(() -> new CustomException(ErrorCode.GROUP_NOT_FOUND));

        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        List<ShareDiary> shareDiaries = shareDiaryRepository.findByGroupAndDateBetween(group, startOfMonth, startOfNextMonth);
        return shareDiaries.stream()
                .map(ShareDiaryDateResponse::from)
                .toList();
    }

    // 해당 날짜 공유일기 id 조회
    @Transactional(readOnly = true)
    public Long getShareDiaryId(Long groupId, LocalDate date) {
        Friend group = friendRepository.findById(groupId)
                .orElseThrow(() -> new CustomException(ErrorCode.GROUP_NOT_FOUND));
        return shareDiaryRepository.findShareDiaryIdByGroupIdAndDate(group, date)
                .orElse(null);
    }
}
