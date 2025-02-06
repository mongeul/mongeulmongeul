package com.specup.mongeul.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // 인증 관련 에러
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다"),
    DUPLICATE_USER_ID(HttpStatus.CONFLICT, "이미 존재하는 아이디입니다"),
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "이미 존재하는 이메일입니다"),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다"),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 리프레시 토큰입니다"),
    PASSWORD_MISMATCH(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다"),

    // 일기 관련 에러
    DIARY_NOT_FOUND(HttpStatus.NOT_FOUND, "일기를 찾을 수 없습니다"),
    DIARY_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "이미 오늘은 일기를 작성했습니다."),

    // 파일 관련 에러
    FILE_NOT_FOUND(HttpStatus.NOT_FOUND, "파일을 찾을 수 없습니다"),
    INVALID_FILE_TYPE(HttpStatus.BAD_REQUEST, "지원하지 않는 파일 형식입니다"),
    FILE_SIZE_EXCEEDED(HttpStatus.BAD_REQUEST, "파일 크기가 제한을 초과했습니다"),
    DATA_PROCESSING_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "데이터 처리 중 오류가 발생했습니다"),
    FILE_UPLOAD_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다"),
    FILE_READ_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "파일 읽기에 실패했습니다"),
    DATA_NOT_FOUND(HttpStatus.NOT_FOUND, "변환된 데이터를 찾을 수 없습니다."),

    // 작업 관련 에러
    JOB_NOT_FOUND(HttpStatus.NOT_FOUND, "작업을 찾을 수 없습니다"),
    CONVERSION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "변환 작업이 실패했습니다"),
    INVALID_JOB_STATUS(HttpStatus.BAD_REQUEST, "잘못된 작업 상태입니다"),
    NOT_CONFIRMED_YET(HttpStatus.BAD_REQUEST, "아직 확정되지 않은 결과입니다"),
    ERP_SEND_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "ERP 전송에 실패했습니다"),
    FILE_DOWNLOAD_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "파일 다운로드에 실패했습니다"),

    // 기준코드 관련 에러
    REFERENCE_CODE_NOT_FOUND(HttpStatus.NOT_FOUND, "기준코드 파일을 찾을 수 없습니다"),
    API_RESPONSE_EMPTY(HttpStatus.BAD_REQUEST, "API 응답이 비어있습니다"),
    API_CALL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "외부 API 호출 중 오류가 발생했습니다"),
    API_NOT_FOUND(HttpStatus.NOT_FOUND, "API를 찾을 수 없습니다"),

    // 결제 관련 에러
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "상품을 찾을 수 없습니다"),
    PAYMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "결제 정보를 찾을 수 없습니다"),
    PAYMENT_NOT_COMPLETED(HttpStatus.BAD_REQUEST, "결제가 완료되지 않았습니다"),
    PAYMENT_AMOUNT_MISMATCH(HttpStatus.BAD_REQUEST, "결제 금액이 일치하지 않습니다"),
    INVALID_PAYMENT_STATUS(HttpStatus.BAD_REQUEST, "잘못된 결제 상태입니다"),
    PAYMENT_ALREADY_PROCESSED(HttpStatus.BAD_REQUEST, "이미 처리된 결제입니다"),
    PAYMENT_IN_PROGRESS(HttpStatus.CONFLICT, "결제가 진행 중입니다. 잠시 후 다시 시도해주세요."),
    INVALID_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 요청입니다"),
    ALREADY_REFUNDED(HttpStatus.BAD_REQUEST, "이미 환불 처리된 결제입니다"),
    REFUND_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "환불 처리 중 오류가 발생했습니다"),
    INVALID_REFUND_AMOUNT(HttpStatus.BAD_REQUEST, "잘못된 환불 금액입니다"),
    REFUND_AMOUNT_EXCEEDED(HttpStatus.BAD_REQUEST, "환불 금액이 결제 금액을 초과할 수 없습니다"),

    // 문의 관련 에러
    INQUIRY_NOT_FOUND(HttpStatus.NOT_FOUND, "문의를 찾을 수 없습니다"),
    NOT_AUTHORIZED(HttpStatus.FORBIDDEN, "권한이 없습니다"),

    // Cafe24 관련 에러
    CAFE24_TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "Cafe24 토큰 정보를 찾을 수 없습니다"),
    CAFE24_TOKEN_ERROR(HttpStatus.UNAUTHORIZED, "Cafe24 토큰 발급에 실패했습니다"),
    CAFE24_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "Cafe24 토큰이 만료되었습니다"),
    CAFE24_INVALID_MALL_ID(HttpStatus.BAD_REQUEST, "유효하지 않은 Mall ID입니다"),
    CAFE24_API_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Cafe24 API 호출 중 오류가 발생했습니다"),
    CAFE24_API_NOT_CONNECTED(HttpStatus.NOT_FOUND, "연동된 Cafe24 API를 찾을 수 없습니다"),
    CAFE24_API_CONNECTION_EXPIRED(HttpStatus.UNAUTHORIZED, "Cafe24 API 연동이 만료되었습니다"),
    CAFE24_API_TEST_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "Cafe24 API 테스트에 실패했습니다"),

    // Ecount 관련 에러
    ECOUNT_API_NOT_CONNECTED(HttpStatus.UNAUTHORIZED, "이카운트 API 연동이 필요합니다"),
    ECOUNT_API_TEST_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "이카운트 API 테스트에 실패했습니다"),
    ECOUNT_API_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "이카운트 API 호출 중 오류가 발생했습니다"),
    ECOUNT_API_CONNECTION_EXPIRED(HttpStatus.UNAUTHORIZED, "이카운트 API 연동이 만료되었습니다"),
    ECOUNT_API_EXPIRED(HttpStatus.UNAUTHORIZED, "이카운트 API 키가 만료되었습니다"),

    // 사용량 제한 관련 에러
    USER_USAGE_LIMIT_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자의 사용량 제한 정보를 찾을 수 없습니다"),
    MONTHLY_LINE_LIMIT_EXCEEDED(HttpStatus.BAD_REQUEST, "월간 라인 사용량 한도를 초과했습니다"),
    UPLOAD_LINE_LIMIT_EXCEEDED(HttpStatus.BAD_REQUEST, "1회 업로드 라인 수 한도를 초과했습니다"),
    REFERENCE_CODE_LIMIT_EXCEEDED(HttpStatus.BAD_REQUEST, "기준코드 등록 한도를 초과했습니다"),
    API_ACCESS_DENIED(HttpStatus.FORBIDDEN, "API 접근 권한이 없습니다"),
    FEATURE_ACCESS_DENIED(HttpStatus.FORBIDDEN, "현재 요금제에서는 사용할 수 없는 기능입니다");

    private final HttpStatus status;
    private final String message;
}