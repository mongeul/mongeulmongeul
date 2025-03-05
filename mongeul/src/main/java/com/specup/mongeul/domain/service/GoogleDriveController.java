package com.specup.mongeul.domain.service;

import com.google.api.services.drive.model.File;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.specup.mongeul.global.common.ApiResponse;

import java.util.List;
import java.util.Map;

@Tag(name = "GoogleDrive", description = "구글 드라이브 API")
@RestController
@RequestMapping("/api/drive")
@RequiredArgsConstructor
@Validated
public class GoogleDriveController {

    private final GoogleDriveService googleDriveService;

    @Operation(
            summary = "파일 업로드",
            description = "파일을 구글 드라이브에 업로드합니다. 파일 타입은 자동으로 감지됩니다."
    )
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadFile(
            @ModelAttribute FileUploadDto uploadDto) {
        MultipartFile file = uploadDto.getFile();
        String fileName = uploadDto.getFileName();
        try {
            // 서비스 계층으로 파일 처리 로직 이동
            Map<String, String> response = googleDriveService.processAndUploadFile(file, fileName);
            return ResponseEntity.ok(ApiResponse.success(response, "파일 업로드 성공"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(ApiResponse.error("파일 업로드 실패: " + e.getMessage()));
        }
    }

    @Operation(summary = "파일 삭제", description = "구글 드라이브에서 파일을 삭제합니다.")
    @DeleteMapping("/{fileId}")
    public ResponseEntity<ApiResponse<Void>> deleteFile(@PathVariable String fileId) {
        try {
            googleDriveService.deleteFile(fileId);
            return ResponseEntity.ok(ApiResponse.success(null, "파일 삭제 성공"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(ApiResponse.error("파일 삭제 실패: " + e.getMessage()));
        }
    }

    @Operation(summary = "파일 목록 조회", description = "구글 드라이브의 파일 목록을 조회합니다.")
    @GetMapping("/list")
    public ResponseEntity<ApiResponse<List<File>>> listFiles() {
        try {
            List<File> files = googleDriveService.listFiles();
            return ResponseEntity.ok(ApiResponse.success(files, "파일 목록 조회 성공"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(ApiResponse.error("파일 목록 조회 실패: " + e.getMessage()));
        }
    }
}