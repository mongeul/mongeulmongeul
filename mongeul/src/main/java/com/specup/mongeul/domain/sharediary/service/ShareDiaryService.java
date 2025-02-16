package com.specup.mongeul.domain.sharediary.service;

import com.specup.mongeul.domain.sharediary.dto.request.ShareDiaryCreateRequest;
import com.specup.mongeul.domain.sharediary.dto.response.ShareDiaryResponse;
import com.specup.mongeul.domain.sharediary.repository.ShareDiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ShareDiaryService {
    private final ShareDiaryRepository shareDiaryRepository;
}
