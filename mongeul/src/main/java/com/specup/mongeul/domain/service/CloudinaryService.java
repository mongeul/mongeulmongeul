package com.specup.mongeul.domain.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Map;
import java.util.Objects;

@Service
public class CloudinaryService {

    private static final Logger logger = LoggerFactory.getLogger(CloudinaryService.class);

    private final Cloudinary cloudinary;

    @Value("${cloudinary.folder.diary}")
    private String diaryFolder;

    @Value("${cloudinary.folder.share-diary}")
    private String shareDiaryFolder;

    public CloudinaryService(
            @Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}") String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret) {

        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true));

        logger.info("CloudinaryService initialized with cloud name: {}", cloudName);
    }

    /**
     * 일기 이미지 업로드
     * @param file 업로드할 파일
     * @param userId 사용자 ID
     * @param date 날짜
     * @param isDiary 일기 여부 (true: 일반 일기, false: 공유 일기)
     * @return 업로드된 파일의 URL
     * @throws Exception 업로드 중 발생한 예외
     */
    public String uploadFile(File file, Long userId, LocalDate date, boolean isDiary) throws Exception {
        String folder = isDiary ? diaryFolder : shareDiaryFolder;
        String publicId = folder + "/" + userId + "_" + date.toString();

        // 이미 존재하는 파일이 있으면 삭제 (덮어쓰기)
        try {
            deleteExistingFile(publicId);
        } catch (Exception e) {
            // 기존 파일이 없으면 무시
        }

        Map uploadResult = cloudinary.uploader().upload(file,
                ObjectUtils.asMap(
                        "public_id", publicId,
                        "overwrite", true,
                        "resource_type", "auto"
                ));

        String secureUrl = (String) uploadResult.get("secure_url");

        // 콘솔에도 URL 출력
        System.out.println("업로드된 이미지 URL: " + secureUrl);

        return secureUrl;
    }

    /**
     * MultipartFile을 File로 변환하여 업로드
     * @param file 업로드할 MultipartFile
     * @param userId 사용자 ID
     * @param date 날짜
     * @param isDiary 일기 여부
     * @return 업로드된 파일의 URL
     * @throws Exception 업로드 중 발생한 예외
     */
    public String uploadFile(MultipartFile file, Long userId, LocalDate date, boolean isDiary) throws Exception {
        File convertedFile = convertMultiPartToFile(file);
        try {
            return uploadFile(convertedFile, userId, date, isDiary);
        } finally {
            // 임시 파일 삭제
            if (convertedFile != null && convertedFile.exists()) {
                boolean deleted = convertedFile.delete();
            }
        }
    }

    /**
     * 파일 삭제
     * @param fileUrl 삭제할 파일 URL
     */
    public void deleteFile(String fileUrl) {
        try {
            String publicId = extractPublicIdFromUrl(fileUrl);

            Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());

            // 콘솔에 삭제 결과 출력
            System.out.println("파일 삭제 결과: " + result);
        } catch (Exception e) {
            throw new RuntimeException("Cloudinary 파일 삭제 실패: " + e.getMessage(), e);
        }
    }

    /**
     * 기존 파일 삭제 (덮어쓰기용)
     * @param publicId 공개 ID
     * @throws Exception 삭제 중 발생한 예외
     */
    private void deleteExistingFile(String publicId) throws Exception {
        Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    /**
     * Cloudinary URL에서 Public ID 추출
     * @param fileUrl Cloudinary 파일 URL
     * @return Public ID
     */
//    private String extractPublicIdFromUrl(String fileUrl) {
//
//        // URL 형식: https://res.cloudinary.com/cloud-name/image/upload/v1234567890/folder/file_name
//        String[] parts = fileUrl.split("/");
//        StringBuilder publicId = new StringBuilder();
//
//        boolean startCollecting = false;
//        for (String part : parts) {
//            if (startCollecting) {
//                publicId.append(part).append("/");
//            }
//            if (part.startsWith("v") && part.substring(1).matches("\\d+")) {
//                startCollecting = true;
//            }
//        }
//
//        // 마지막 슬래시 제거
//        if (publicId.length() > 0) {
//            publicId.setLength(publicId.length() - 1);
//        }
//
//        String result = publicId.toString();
//        return result;
//    }
    private String extractPublicIdFromUrl(String fileUrl) {
        // 예: https://res.cloudinary.com/daw5iggrn/image/upload/v1234567890/folder/filename.png

        try {
            int uploadIndex = fileUrl.indexOf("/upload/");
            if (uploadIndex == -1) {
                throw new IllegalArgumentException("Cloudinary URL 형식이 올바르지 않습니다.");
            }

            // upload/ 이후 전체 경로
            String afterUpload = fileUrl.substring(uploadIndex + "/upload/".length());

            // 첫 번째 '/' 기준으로 잘라서 버전(v...) 제거
            String[] parts = afterUpload.split("/", 2);
            if (parts.length < 2) {
                throw new IllegalArgumentException("Cloudinary URL에서 public_id를 추출할 수 없습니다.");
            }

            String publicIdWithExt = parts[1];

            // 확장자 제거
            if (publicIdWithExt.contains(".")) {
                publicIdWithExt = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
            }

            return publicIdWithExt;

        } catch (Exception e) {
            throw new RuntimeException("Cloudinary URL에서 public_id 추출 실패: " + e.getMessage(), e);
        }
    }

    /**
     * MultipartFile을 File로 변환
     * @param file 변환할 MultipartFile
     * @return 변환된 File
     * @throws IOException 파일 변환 중 발생한 예외
     */
    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convertedFile);
        fos.write(file.getBytes());
        fos.close();
        return convertedFile;
    }
}