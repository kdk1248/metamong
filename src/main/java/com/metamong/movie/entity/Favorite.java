package com.metamong.movie.entity;

import com.metamong.movie.dto.FavoriteRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class Favorite {
    private Long id;
    private String moviename;

    public Favorite(FavoriteRequestDto favoriteRequestDto) {
        this.moviename = favoriteRequestDto.getMoviename();
    }
    public void update(FavoriteRequestDto favoriteRequestDto){
        this.moviename= favoriteRequestDto.getMoviename();
    }
}