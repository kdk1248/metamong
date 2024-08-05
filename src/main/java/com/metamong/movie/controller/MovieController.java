package com.metamong.movie.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movie")
public class MovieController {

    @PostMapping("/add")
    @ResponseBody
    public String addMovie(@RequestBody String movieDetails) {
        return "영화가 추가됨";
    }

    @PutMapping("/{id}/update")
    @ResponseBody
    public String updateMovie(@PathVariable("id") Long id, @RequestBody String movieDetails) {
        return "특정 영화가 수정됨";
    }

    @DeleteMapping("/{id}/remove")
    @ResponseBody
    public String deleteMovie(@PathVariable("id") Long id) {
        return "특정 영화가 삭제됨";
    }

    @GetMapping("/show")
    @ResponseBody
    public String showMovies() {
        return "전체 영화 조회";
    }

    @GetMapping("/show/{id}")
    @ResponseBody
    public String showMovieById(@PathVariable("id") Long id) {
        return "특정 영화 조회";
    }
}