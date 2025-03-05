package com.specup.mongeul.domain.service;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FileUploadDto {

    @Schema(description = "업로드할 파일", type = "string", format = "binary")
    private MultipartFile file;

    @Schema(description = "파일 이름 (선택 사항)", type = "string", example = "my_image.jpg")
    private String fileName;
}