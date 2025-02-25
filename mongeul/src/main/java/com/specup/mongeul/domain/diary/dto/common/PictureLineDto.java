package com.specup.mongeul.domain.diary.dto.common;

import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class PictureLineDto {
    private String stroke;
    private int strokeWidth;
    private List<List<Integer>> points;

    public static PictureLineDto from(String stroke, int strokeWidth, List<List<Integer>> points) {
        PictureLineDto response = new PictureLineDto();
        response.stroke = stroke;
        response.strokeWidth = strokeWidth;
        response.points = points;
        return response;
    }
}
