package com.metamong.movie.repository;

import com.metamong.movie.dto.ReviewRequestDto;
import com.metamong.movie.dto.ReviewResponseDto;
import com.metamong.movie.entity.Review;
import com.metamong.movie.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReviewRepository {
    private final JdbcTemplate jdbcTemplate;

    /**
     * CREATE
     * @param review
     * @return
     */
    public Review save(Review review) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        String sql = "INSERT INTO review (username, contents) VALUES (?,?)";
        jdbcTemplate.update(con -> {
            PreparedStatement preparedStatement
                    = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, review.getUsername());
            preparedStatement.setString(2, review.getContents());
            return preparedStatement;
        }, keyHolder);
        Long id = keyHolder.getKey().longValue();
        review.setId(id);
        return review;
    }

    /**
     * READ
     * @return List<ReviewResponseDto>
     */
    public List<ReviewResponseDto> getreivews() {
        String sql = "SELECT * from review";
        return jdbcTemplate.query(sql,new RowMapper<ReviewResponseDto>() {
            @Override
            public ReviewResponseDto mapRow (ResultSet rs, int rowNum) throws SQLException {
                Long id = rs.getLong("id");
                String username = rs.getString("username");
                String contents = rs.getString("contents");

                return new ReviewResponseDto(id, username, contents);
            }
        });
    }

    /**
     * UPDATE
     * @param id
     * @param reviewRequestDto
     */
    public void update(Long id, ReviewRequestDto reviewRequestDto) {
        String sql = "UPDATE review SET username=?, contents =? WHERE id=?";
        jdbcTemplate.update(sql, reviewRequestDto.getUsername(), reviewRequestDto.getContents(), id);
    }

    /**
     * DELETE
     * @param id
     */
    public void delete(Long id) {
        String sql ="DELETE FROM review WHERE id=?";
        jdbcTemplate.update(sql, id);
    }

    /**
     * 특정 id의  리뷰 존재 여부 확인
     * @param id
     * @return
     */
    public Review findById(Long id) {
        String sql = "SELECT *FROM review WHERE id = ?";
        return jdbcTemplate.query(sql,resultSet->{
            if(resultSet.next()){
                Review review = new Review();
                review.setUsername(resultSet.getString("username"));
                review.setContents(resultSet.getString("contents"));
                return review;
            }else{
                return null;
            }
        },id);
    }

}
