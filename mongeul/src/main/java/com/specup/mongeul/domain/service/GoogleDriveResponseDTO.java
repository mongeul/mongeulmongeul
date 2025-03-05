package com.specup.mongeul.domain.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoogleDriveResponseDTO {
    private boolean success;
    private String message;
    private Object data;
}