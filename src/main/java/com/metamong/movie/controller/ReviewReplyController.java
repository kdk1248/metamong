package com.metamong.movie.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/reply")
public class ReviewReplyController {

    @PostMapping("/add")
    @ResponseBody
    public String addReply() {
        return "답글이 추가됨";
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public String updateReply() {
        return "특정 답글이 수정됨";
    }

    @DeleteMapping("/remove/{id}")
    @ResponseBody
    public String deleteReply() {
        return "특정 답글이 삭제됨";
    }

    @GetMapping("/show")
    @ResponseBody
    public String showReplies() {
        return "전체 답글 조회";
    }

    @GetMapping("/show/{id}")
    @ResponseBody
    public String showReplyById() {
        return "특정 답글 조회";
    }

    @PutMapping("/{id}/like")
    @ResponseBody
    public String likeReply() {
        return "특정 답글에 좋아요";
    }

    @PutMapping("/{id}/dislike")
    @ResponseBody
    public String dislikeReply() {
        return "특정 답글에 싫어요";
    }
}
