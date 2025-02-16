package com.specup.mongeul.domain.sharediary.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "ShareDiary", description = "공유일기 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ShareDiaryController {
}
