package com.metamong.movie.controller;

import com.meta.ProjectMovie.model.Review;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    private List<Review> reviewList = new ArrayList<>();

    @PostMapping("/add")
    @ResponseBody
    public String addReview(@RequestBody Review review) {
        reviewList.add(review);
        return "댓글이 추가됨";
    }

    @PutMapping("/update/{id}")
    @ResponseBody
    public String updateReview(@PathVariable Long id, @RequestBody Review updatedReview) {
        for (Review review : reviewList) {
            if (review.getReview_id().equals(id)) {
                review.setReview_contents(updatedReview.getReview_contents());
                review.setReview_star(updatedReview.getReview_star());
                review.setReview_modifiedAt(updatedReview.getReview_modifiedAt());
                return "특정 댓글이 수정됨";
            }
        }
        return "댓글을 찾을 수 없음";
    }

    @DeleteMapping("/remove/{id}")
    @ResponseBody
    public String deleteReview(@PathVariable Long id) {
        reviewList.removeIf(review -> review.getReview_id().equals(id));
        return "댓글이 삭제됨";
    }

    @GetMapping("/show")
    @ResponseBody
    public List<Review> showReviews() {
        return reviewList;
    }

    @GetMapping("/show/{id}")
    @ResponseBody
    public Review showReviewById(@PathVariable Long id) {
        return reviewList.stream().filter(review -> review.getReview_id().equals(id)).findFirst().orElse(null);
    }

    @PutMapping("/{id}/like")
    @ResponseBody
    public String likeReview(@PathVariable Long id) {
        for (Review review : reviewList) {
            if (review.getReview_id().equals(id)) {
                review.setReview_like(review.getReview_like() + 1);
                return "특정 댓글에 좋아요";
            }
        }
        return "댓글을 찾을 수 없음";
    }

    @PutMapping("/{id}/dislike")
    @ResponseBody
    public String dislikeReview(@PathVariable Long id) {
        for (Review review : reviewList) {
            if (review.getReview_id().equals(id)) {
                review.setReview_dislike(review.getReview_dislike() + 1);
                return "특정 댓글에 싫어요";
            }
        }
        return "댓글을 찾을 수 없음";
    }
}
