package com.specup.mongeul.domain.notification.dto.response;

import com.specup.mongeul.domain.notification.dto.NotificationDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {
    private List<NotificationDTO> content;
}