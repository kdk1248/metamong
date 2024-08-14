package com.metamong.movie.controller;

import com.metamong.movie.dto.ReviewRequestDto;
import com.metamong.movie.dto.ReviewResponseDto;
import com.metamong.movie.service.ReviewService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ReviewController {
    private final ReviewService reviewService;
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    /**
     * CREATE
     * @param reviewRequestDto
     * @return
     */
    @PostMapping("/reviews")
    public ReviewResponseDto createReview(@RequestBody ReviewRequestDto reviewRequestDto){
        return reviewService.createReview(reviewRequestDto);
    }

    /**
     * READ
     * @return List<MemoResponseDto>
     */
    @GetMapping("/reviews")
    public List<ReviewResponseDto> getReviews(){
        return reviewService.getReviews();
    }

    /**
     * UPDATE
     * @param id
     * @param reviewRequestDto
     * @return
     */
    @PutMapping("/reviews/{id}")
    public Long updateMemo(@PathVariable Long id, @RequestBody ReviewRequestDto reviewRequestDto){
        return reviewService.updateReview(id, reviewRequestDto);
    }

    /**
     * DELETE
     * @param id
     * @return id
     */
    @DeleteMapping("/reviews/{id}")
    public Long deleteReview(@PathVariable Long id){
        return reviewService.deleteReview(id);
    }
}