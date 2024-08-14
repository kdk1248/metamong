package com.metamong.movie.service;

import com.metamong.movie.dto.ReviewRequestDto;
import com.metamong.movie.dto.ReviewResponseDto;
import com.metamong.movie.entity.Review;
import com.metamong.movie.repository.ReviewRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component

public class ReviewService{
    private final ReviewRepository reviewRepository;
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    /**
     * CREATE
     * @param reviewRequestDto
     * @return
     */
    public ReviewResponseDto createReview(ReviewRequestDto reviewRequestDto) {
        Review review = new Review(reviewRequestDto);

        Review saveReview = reviewRepository.save(review);

        ReviewResponseDto reviewResponseDto = new ReviewResponseDto(saveReview);

        return reviewResponseDto;
    }

    /**
     * READ
     * @return
     */
    public List<ReviewResponseDto> getReviews() {
        List<ReviewResponseDto> reviewResponseDtos = reviewRepository.getreivews();
        return reviewResponseDtos;
    }

    /**
     * UPDATE
     * @param id
     * @param reviewRequestDto
     * @return
     */
    public Long updateReview(Long id, ReviewRequestDto reviewRequestDto) {
        Review review = reviewRepository.findById(id);
        if(review != null){
            reviewRepository.update(id, reviewRequestDto);

            return id;
        }else{
            throw new IllegalArgumentException("선택한 리뷰는 존재하지 않습니다");
        }
    }

    /**
     * DELETE
     * @param id
     * @return
     */
    public Long deleteReview(Long id) {
        Review review = reviewRepository.findById(id);
        if(review !=null){
            reviewRepository.delete(id);

            return id;
        }else{
            throw new IllegalArgumentException("선택한 리뷰는 존재하지 않습니다");
        }
    }
}

