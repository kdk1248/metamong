package com.metamong.movie.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/genre")
public class GenreController {

    @PostMapping("/add")
    @ResponseBody
    public String addGenre() {
        return "장르가 추가됨";
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public String updateGenre() {
        return "특정 장르가 수정됨";
    }

    @DeleteMapping("/remove/{id}")
    @ResponseBody
    public String deleteGenre() {
        return "특정 장르가 삭제됨";
    }

    @GetMapping("/show")
    @ResponseBody
    public String showGenres() {
        return "전체 장르 조회";
    }

    @GetMapping("/show/{id}")
    @ResponseBody
    public String showGenreById() {
        return "특정 장르 조회";
    }
}
