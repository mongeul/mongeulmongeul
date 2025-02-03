package com.specup.mongeul.domain.user.dto.response;

import com.specup.mongeul.domain.user.dto.request.TestRequest;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TestResponse {
    private String testResponse;
    private TestRequest request;
}
