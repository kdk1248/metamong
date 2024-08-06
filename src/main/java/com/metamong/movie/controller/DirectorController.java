package com.metamong.movie.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/director")
public class DirectorController {

    @PostMapping("/add")
    @ResponseBody
    public String addDirector() {
        return "영화 감독이 추가됨";
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public String updateDirector() {
        return "특정 영화 감독이 수정됨";
    }

    @DeleteMapping("/remove/{id}")
    @ResponseBody
    public String deleteDirector() {
        return "특정 영화 감독이 삭제됨";
    }

    @GetMapping("/show")
    @ResponseBody
    public String showDirectors() {
        return "전체 영화 감독 조회";
    }

    @GetMapping("/show/{id}")
    @ResponseBody
    public String showDirectorById() {
        return "특정 영화 감독 조회";
    }
}
