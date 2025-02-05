package com.specup.mongeul.global.common;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass
public class BaseSoftDeleteEntity extends BaseTimeEntity {

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    protected boolean isDeleted;

    protected LocalDateTime deletedAt;
}