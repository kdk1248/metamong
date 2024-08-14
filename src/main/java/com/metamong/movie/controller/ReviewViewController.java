package com.metamong.movie.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReviewViewController {
    @GetMapping("/myreview")
    public String home() {return "index";}
}
