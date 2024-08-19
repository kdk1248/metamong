package com.metamong.movie.dto;

import com.metamong.movie.entity.Favorite;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FavoriteResponseDto {
    private Long id;
    private String moviename;

    public FavoriteResponseDto(Favorite favorite){
        this.id= favorite.getId();
        this.moviename=favorite.getMoviename();

    }
}
