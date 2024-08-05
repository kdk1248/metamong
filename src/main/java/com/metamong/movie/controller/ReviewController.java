package com.metamong.movie.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @PostMapping("/add")
    @ResponseBody
    public String addReview() {
        return "댓글이 추가됨";
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public String updateReview() {
        return "특정 댓글이 수정됨";
    }

    @DeleteMapping("/remove/{id}")
    @ResponseBody
    public String deleteReview() {
        return "특정 댓글이 삭제됨";
    }

    @GetMapping("/show")
    @ResponseBody
    public String showReviews() {
        return "전체 댓글 조회";
    }

    @GetMapping("/show/{id}")
    @ResponseBody
    public String showReviewById() {
        return "특정 댓글 조회";
    }

    @PutMapping("/{id}/like")
    @ResponseBody
    public String likeReview() {
        return "특정 댓글에 좋아요";
    }

    @PutMapping("/{id}/dislike")
    @ResponseBody
    public String dislikeReview() {
        return "특정 댓글에 싫어요";
    }
}