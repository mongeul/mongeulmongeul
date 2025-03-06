package com.specup.mongeul.domain.diary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.specup.mongeul.domain.diary.dto.common.PictureLineDto;
import com.specup.mongeul.domain.diary.dto.request.Diary.DiaryCreateRequest;
import com.specup.mongeul.domain.diary.dto.request.Diary.DiaryDraftRequest;
import com.specup.mongeul.domain.diary.dto.request.Diary.DiaryUpdateRequest;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryDateResponse;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryDraftResponse;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryResponse;
import com.specup.mongeul.domain.diary.dto.response.Diary.DiaryPictureLineResponse;
import com.specup.mongeul.domain.diary.entity.Diary;
import com.specup.mongeul.domain.diary.entity.ENUM.DiaryPrivate;
import com.specup.mongeul.domain.diary.repository.DiaryRepository;
import com.specup.mongeul.domain.service.GoogleDriveService;
import com.specup.mongeul.domain.user.entity.LockPassword;
import com.specup.mongeul.domain.user.entity.User;
import com.specup.mongeul.domain.user.repository.LockPasswordRepository;
import com.specup.mongeul.domain.user.repository.UserRepository;
import com.specup.mongeul.global.error.CustomException;
import com.specup.mongeul.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiaryService {
    private final UserRepository userRepository;
    private final DiaryRepository diaryRepository;
    private final LockPasswordRepository lockPasswordRepository;
    private final ObjectMapper objectMapper;
    private final GoogleDriveService googleDriveService;

    // 일기 생성
    @Transactional
    public DiaryResponse create(Long userId, DiaryCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if (diaryRepository.existsByUserIdAndDateAndPublished(userId, request.getDate(), true)) {
            throw new CustomException(ErrorCode.DIARY_ALREADY_EXISTS);
        }

        MultipartFile picture = request.getPicture();
        // 그림 URL 생성
        String pictureUrl = null;
        if (picture != null && !picture.isEmpty()) {
            try {
                // 임시 파일 생성 및 업로드
                java.io.File tempFile = java.io.File.createTempFile("temp-", null);
                picture.transferTo(tempFile);

                pictureUrl = googleDriveService.uploadFile(tempFile, picture.getContentType(), userId, request.getDate(), true);

                // 파일 자동 삭제 (try-with-resources 활용)
                if (!tempFile.delete()) {
                    tempFile.getAbsolutePath();
                }
            } catch (Exception e) {
                throw new RuntimeException("파일 업로드 실패", e);
            }
        }

        Diary diary = diaryRepository.save(
                Diary.create(
                        request.getTitle(), request.getContent(), pictureUrl,
                        request.getDate(), request.getPictureLines(), request.getWeather(), request.getFeeling(),
                        request.getPrivateStatus(), true, user
                )
        );
        return DiaryResponse.from(diary);
    }

    // 일기 임시저장
    @Transactional
    public DiaryDraftResponse saveDraft(Long userId, DiaryDraftRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        String pictureLinesJson = null;
        if (request.getPictureLines() != null && !request.getPictureLines().isEmpty()) {
            try {
                pictureLinesJson = objectMapper.writeValueAsString(request.getPictureLines());
            } catch (JsonProcessingException e) {
                throw new RuntimeException("PictureLines Json 직렬화 실패", e);
            }
        }

        Diary diary = diaryRepository.save(
                Diary.create(
                        request.getTitle(), request.getContent(), null,
                        request.getDate(), pictureLinesJson, request.getWeather(), request.getFeeling(),
                        request.getPrivateStatus(), false, user
                )
        );
        return DiaryDraftResponse.from(diary);
    }

    // 임시저장 -> 최종저장
//    @Transactional
//    public DiaryResponse publish(Long userId, Long diaryId) {
//        Diary diary = diaryRepository.findById(diaryId)
//                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
//        if (!diary.getUser().getId().equals(userId)) {
//            throw new CustomException(ErrorCode.INVALID_DIARY_USER);
//        }
//        if (diaryRepository.existsByUserIdAndDateAndPublished(userId, diary.getDate(), true)) {
//            throw new CustomException(ErrorCode.DIARY_ALREADY_EXISTS);
//        }
//        diary.update(diary.getTitle(), diary.getContent(), diary.getPicture(),
//                diary.getDate(), diary.getPictureLines(), diary.getWeather(),
//                diary.getFeeling(), diary.getPrivateStatus(), true);
//        return DiaryResponse.from(diary);
//    }

    // 일기 수정
    @Transactional
    public DiaryResponse update(Long userId, Long diaryId, DiaryUpdateRequest request) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));

        if (!diary.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.INVALID_DIARY_USER);
        }

        if (!diary.getDate().equals(request.getDate()) && diary.getPublished()) {
            if (diaryRepository.existsByUserIdAndDateAndPublished(userId, request.getDate(), true)) {
                throw new CustomException(ErrorCode.DIARY_ALREADY_EXISTS);
            }
        }

        MultipartFile newPicture = request.getPicture();
        String pictureUrl = diary.getPicture();

        if (newPicture != null && !newPicture.isEmpty()) {
            try {
                // 새 이미지 업로드 (자동 덮어쓰기 로직 포함)
                java.io.File tempFile = java.io.File.createTempFile("temp-", null);
                newPicture.transferTo(tempFile);
                pictureUrl = googleDriveService.uploadFile(tempFile, newPicture.getContentType(), userId, request.getDate(), true);

                tempFile.delete();
            } catch (Exception e) {
                throw new RuntimeException("파일 업로드 실패", e);
            }
        } else {
            pictureUrl = null;
        }

        diary.update(
                request.getTitle(), request.getContent(), pictureUrl,
                request.getDate(), request.getPictureLines(), request.getWeather(),
                request.getFeeling(), request.getPrivateStatus(), diary.getPublished());

        return DiaryResponse.from(diary);
    }

    // 캘린더 일기 조회
    @Transactional(readOnly = true)
    public List<DiaryResponse> getCalendarDiaries(Long userId, int year, int month) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        List<Diary> diaries = diaryRepository.findByUserAndDateBetween(user, startOfMonth, startOfNextMonth);
        return diaries.stream()
                .map(DiaryResponse::from)
                .toList();
    }

    // 일기 임시저장 목록 조회
    @Transactional(readOnly = true)
    public List<DiaryDraftResponse> getDraftDiaries(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        List<Diary> diaries = diaryRepository.findByUserAndPublishedOrderByDateDescIdDesc(user, false);
        return diaries.stream()
                .map(DiaryDraftResponse::from)
                .toList();
    }

    // 특정 일기 조회
    @Transactional(readOnly = true)
    public DiaryResponse read(Long userId, Long diaryId, String lockPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        if (diary.getPrivateStatus() == DiaryPrivate.LOCK) {
            if (lockPassword == null || lockPassword.isEmpty()) {
                throw new CustomException(ErrorCode.DIARY_LOCK_PASSWORD_REQUIRED);
            }
            LockPassword lock = lockPasswordRepository.findByUser(user)
                    .orElseThrow(() -> new CustomException(ErrorCode.DIARY_LOCK_PASSWORD_REQUIRED));

            if (!lock.getLockPassword().equals(lockPassword)) {
                throw new CustomException(ErrorCode.DIARY_INVALID_LOCK_PASSWORD);
            }
        }
        return DiaryResponse.from(diary);
    }

    // 일기 삭제
    @Transactional
    public void delete(Long userId, Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));
        if (!diary.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.INVALID_DIARY_USER);
        }

        // Google Drive 이미지 삭제 (파일 URL이 있을 경우)
        if (diary.getPicture() != null && diary.getPicture().contains("id=")) {
            try {
                googleDriveService.deleteFile(diary.getPicture());
            } catch (Exception e) {
                throw new RuntimeException("파일 삭제 실패", e);
            }
        }

        diaryRepository.delete(diary);
    }

    // 그림 조회
    @Transactional(readOnly = true)
    public DiaryPictureLineResponse readPicture(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new CustomException(ErrorCode.DIARY_NOT_FOUND));

        List<PictureLineDto> pictureLines = null;
        if (diary.getPictureLines() != null && !diary.getPictureLines().isEmpty()) {
            try {
                pictureLines = objectMapper.readValue(diary.getPictureLines(),
                        objectMapper.getTypeFactory().constructCollectionType(List.class, PictureLineDto.class));
            } catch (JsonProcessingException e) {
                throw new RuntimeException("PictureLines JSON 역직렬화 실패", e);
            }
        }
        return DiaryPictureLineResponse.from(diary.getId(), pictureLines);
    }

    // 일기 작성 날짜 조회
    @Transactional(readOnly = true)
    public List<DiaryDateResponse> getDates(Long userId, int year, int month) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        List<Diary> diaries = diaryRepository.findByUserAndDateBetween(user, startOfMonth, startOfNextMonth);
        return diaries.stream()
                .map(DiaryDateResponse::from)
                .toList();
    }

    // 해당날짜 다이어리 id 찾기
    @Transactional(readOnly = true)
    public Long getDiaryId(Long userId, LocalDate today) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        return diaryRepository.findDiaryIdByUserIdAndDateAndPublished(user, today)
                .orElse(null);
    }
}
