package com.specup.mongeul.domain.service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import com.google.api.services.drive.model.Permission;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.util.*;

@Service
public class GoogleDriveService {
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final List<String> SCOPES = Collections.singletonList(DriveScopes.DRIVE);

    @Value("${google.drive.application-name}")
    private String applicationName;

    @Value("${google.drive.credentials-folder}")
    private String credentialsFolderPath;

    @Value("${google.drive.client-secret-path}")
    private String clientSecretPath;

    @Value("${google.drive.auth-server-port}")
    private int authServerPort;

    @Value("${google.drive.upload-folder-ids.diary}")
    private String diaryUploadFolderId;

    @Value("${google.drive.upload-folder-ids.share-diary}")
    private String shareDiaryUploadFolderId;

    @Value("${google.drive.env}")
    private String googleDriveEnv;

    @Autowired
    private ResourceLoader resourceLoader;

    private Credential getCredentials(final HttpTransport HTTP_TRANSPORT) throws IOException {
        // 경로 객체 생성
        java.io.File credentialsFolder = new java.io.File(credentialsFolderPath);

        Resource resource = resourceLoader.getResource(clientSecretPath);
        InputStream in = resource.getInputStream();

        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(credentialsFolder))
                .setAccessType("offline")
                .build();

        // 설정된 포트를 사용하는 LocalServerReceiver 설정
        LocalServerReceiver receiver = new LocalServerReceiver.Builder()
                .setPort(authServerPort)
                .build();

        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }

    public Drive getDriveService() throws IOException, GeneralSecurityException {
        HttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();

        InputStream credentialStream = resourceLoader.getResource(clientSecretPath).getInputStream();

        if ("prod".equalsIgnoreCase(googleDriveEnv)) {
            // ✅ 운영 환경: 서비스 계정 방식
            GoogleCredentials credentials = GoogleCredentials.fromStream(credentialStream)
                    .createScoped(Collections.singleton(DriveScopes.DRIVE));

            return new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, new HttpCredentialsAdapter(credentials))
                    .setApplicationName(applicationName)
                    .build();

        } else {
            // ✅ 로컬 환경: OAuth 사용자 인증 방식
            GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(credentialStream));

            GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                    HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                    .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(credentialsFolderPath)))
                    .setAccessType("offline")
                    .build();

            LocalServerReceiver receiver = new LocalServerReceiver.Builder()
                    .setPort(authServerPort)
                    .build();

            Credential credential = new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");

            return new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
                    .setApplicationName(applicationName)
                    .build();
        }
    }

    /**
     * 파일 확장자 추출 메소드
     */
    private String getFileExtension(String fileName) {
        if (fileName == null || fileName.lastIndexOf(".") == -1) {
            return "";
        }
        return fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
    }

    /**
     * 파일 확장자로부터 MIME 타입 유추
     */
    private String getMimeTypeFromExtension(String extension) {
        switch (extension.toLowerCase()) {
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            case "gif":
                return "image/gif";
            case "pdf":
                return "application/pdf";
            case "doc":
                return "application/msword";
            case "docx":
                return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
            case "xls":
                return "application/vnd.ms-excel";
            case "xlsx":
                return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            case "ppt":
                return "application/vnd.ms-powerpoint";
            case "pptx":
                return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
            case "txt":
                return "text/plain";
            case "html":
            case "htm":
                return "text/html";
            case "css":
                return "text/css";
            case "js":
                return "application/javascript";
            case "json":
                return "application/json";
            case "xml":
                return "application/xml";
            case "zip":
                return "application/zip";
            case "mp3":
                return "audio/mpeg";
            case "mp4":
                return "video/mp4";
            case "avi":
                return "video/x-msvideo";
            case "webm":
                return "video/webm";
            default:
                return "application/octet-stream"; // 기본 바이너리 타입
        }
    }

    /**
     * 파일 업로드 로직
     */
//    public Map<String, String> processAndUploadFile(MultipartFile file, String fileName) throws Exception {
//        // 파일명이 제공되지 않은 경우 원본 파일명 사용
//        if (fileName == null || fileName.trim().isEmpty()) {
//            fileName = file.getOriginalFilename();
//        }
//
//        // ContentType 확인 (MIME 타입 자동 감지)
//        String mimeType = file.getContentType();
//        if (mimeType == null || mimeType.trim().isEmpty()) {
//            // ContentType이 없는 경우 파일 확장자로 유추
//            String extension = getFileExtension(fileName);
//            mimeType = getMimeTypeFromExtension(extension);
//        }
//
//        // MultipartFile을 임시 파일로 변환
//        java.io.File tempFile = java.io.File.createTempFile("temp-", null);
//        file.transferTo(tempFile);
//
//        // 구글 드라이브에 업로드
//        String fileUrl = uploadFile(tempFile, mimeType, fileName);
//
//        // 임시 파일 삭제
//        tempFile.delete();
//
//        Map<String, String> response = new HashMap<>();
//        response.put("fileUrl", fileUrl);
//        response.put("fileName", fileName);
//        response.put("mimeType", mimeType);
//
//        return response;
//    }

    // 일기 그림 업로드
    public String uploadFile(java.io.File filePath, String mimeType, Long userId, LocalDate date, boolean isDiary) throws Exception {
        Drive driveService = getDriveService();

        String uploadFolderId = isDiary ? diaryUploadFolderId : shareDiaryUploadFolderId;
        String fileExtension = filePath.getName().substring(filePath.getName().lastIndexOf("."));
        String newFileName = userId + "_" + date.toString() + fileExtension;

        // 덮어쓰기 (기존 파일 삭제)
        deleteExistingFile(driveService, newFileName, uploadFolderId);

        // 파일 메타데이터 설정
        File fileMetadata = new File();
        fileMetadata.setName(newFileName);
        fileMetadata.setParents(Collections.singletonList(uploadFolderId));

        // 파일 업로드
        FileContent mediaContent = new FileContent(mimeType, filePath);
        File uploadedFile = driveService.files().create(fileMetadata, mediaContent)
                .setFields("id, parents")
                .execute();

        // 파일 권한 설정 (누구나 읽기 가능)
        Permission permission = new Permission()
                .setType("anyone")
                .setRole("reader");

        driveService.permissions().create(uploadedFile.getId(), permission).execute();

        return "https://drive.google.com/uc?id=" + uploadedFile.getId();
    }

    // 덮어쓰기
    private void deleteExistingFile(Drive driveService, String fileName, String folderId) throws Exception {
        FileList result = driveService.files().list()
                .setQ("name = '" + fileName + "' and '" + folderId + "' in parents and trashed = false")
                .setFields("files(id)")
                .execute();

        List<File> files = result.getFiles();
        if (!files.isEmpty()) {
            for (File file : files) {
                driveService.files().delete(file.getId()).execute();
                Thread.sleep(2000);
            }
        }
    }

    // 삭제
    public void deleteFile(String fileUrl) {
        try {
            String fileId = extractGoogleDriveFileId(fileUrl);
            Drive driveService = getDriveService();
            driveService.files().delete(fileId).execute();
        } catch (Exception e) {
            throw new RuntimeException("Google Drive 파일 삭제 실패: " + e.getMessage(), e);
        }
    }

    // 파일아이디 찾기
    public String extractGoogleDriveFileId(String fileUrl) {
        if (fileUrl == null || !fileUrl.contains("id=")) {
            throw new IllegalArgumentException("올바른 Google Drive 파일 URL이 아닙니다: " + fileUrl);
        }
        return fileUrl.substring(fileUrl.indexOf("id=") + 3);
    }

}