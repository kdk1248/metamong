package com.metamong.movie.model;

import java.time.LocalDateTime;

public class Review {
    private Long review_id;
    private Long user_id;
    private Long movie_id;
    private int review_like;
    private int review_dislike;
    private String review_contents;
    private int review_star;
    private LocalDateTime review_createdAt;
    private LocalDateTime review_modifiedAt;

    // Getters and Setters
    public Long getReview_id() {
        return review_id;
    }

    public void setReview_id(Long review_id) {
        this.review_id = review_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(Long movie_id) {
        this.movie_id = movie_id;
    }

    public int getReview_like() {
        return review_like;
    }

    public void setReview_like(int review_like) {
        this.review_like = review_like;
    }

    public int getReview_dislike() {
        return review_dislike;
    }

    public void setReview_dislike(int review_dislike) {
        this.review_dislike = review_dislike;
    }

    public String getReview_contents() {
        return review_contents;
    }

    public void setReview_contents(String review_contents) {
        this.review_contents = review_contents;
    }

    public int getReview_star() {
        return review_star;
    }

    public void setReview_star(int review_star) {
        this.review_star = review_star;
    }

    public LocalDateTime getReview_createdAt() {
        return review_createdAt;
    }

    public void setReview_createdAt(LocalDateTime review_createdAt) {
        this.review_createdAt = review_createdAt;
    }

    public LocalDateTime getReview_modifiedAt() {
        return review_modifiedAt;
    }

    public void setReview_modifiedAt(LocalDateTime review_modifiedAt) {
        this.review_modifiedAt = review_modifiedAt;
    }
}
