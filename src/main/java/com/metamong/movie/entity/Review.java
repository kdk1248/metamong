package com.metamong.movie.entity;

import com.metamong.movie.dto.ReviewRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class Review {
    private Long id;
    private String username;
    private String contents;

    public Review(ReviewRequestDto reviewRequestDto){
        this.username = reviewRequestDto.getUsername();
        this.contents = reviewRequestDto.getContents();
    }
    public void update(ReviewRequestDto reviewRequestDto){
        this.username = reviewRequestDto.getUsername();
        this.contents = reviewRequestDto.getContents();
    }

}
