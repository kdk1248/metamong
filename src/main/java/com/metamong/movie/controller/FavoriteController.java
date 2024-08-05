package com.metamong.movie.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favourite")
public class FavoriteController {
    @PostMapping("/add")
    public String addFavourite() {
        return "관심 영화가 추가됨";
    }

    @DeleteMapping("/remove/{id}")
    public String removeFavourite() {
        return "관심 영화가 삭제됨";
    }

    @GetMapping("/show")
    public String showFavourites() {
        return "전체 관심 영화 조회";
    }

    @GetMapping("/show/{id}")
    public String showFavouriteById() {
        return "특정 관심 영화 조회";
    }
}

