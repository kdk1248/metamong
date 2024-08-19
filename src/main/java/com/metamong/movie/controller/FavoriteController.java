package com.metamong.movie.controller;

import com.metamong.movie.dto.FavoriteRequestDto;
import com.metamong.movie.dto.FavoriteResponseDto;
import com.metamong.movie.service.FavoriteService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class FavoriteController {
    //관심 영화 변수 선언
    private final FavoriteService favoriteService;

    /**
     * CREATE
     * @param favoriteRequestDto
     * @return
     */
    @PostMapping("/favorites")
    public FavoriteResponseDto createFavorite(@RequestBody FavoriteRequestDto favoriteRequestDto){
        return favoriteService.createFavorite(favoriteRequestDto);
    }

    /**
     * DELETE
     * @param id
     * @return
     */
    @DeleteMapping("/favorites/{id}")
    public Long deleteFavourite(@PathVariable Long id) {
        return favoriteService.deleteFavorite(id);
    }

    /**
     * READ
     * @return List<FavoriteResponseDto>
     */
    @GetMapping("/favorites")
    public List<FavoriteResponseDto> getFavourites() {
        return favoriteService.getFavourites();
    }

    /**
     * READ
     * @param id
     * @return
     */
    @PutMapping("/favorites/{id}")
    public Long updateFavorite(@PathVariable Long id, @RequestBody FavoriteRequestDto favoriteRequestDto) {
        return favoriteService.updateFavorite(id, favoriteRequestDto);
    }
}

