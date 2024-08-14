package com.metamong.movie.dto;

import com.metamong.movie.entity.Review;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReviewResponseDto {
    private Long id;
    private String username;
    private String contents;

    public ReviewResponseDto(Review review){
    this.id=review.getId();
    this.username=review.getUsername();
    this.contents=review.getContents();
    }
}
