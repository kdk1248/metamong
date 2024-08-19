package com.metamong.movie.repository;

import com.metamong.movie.dto.FavoriteRequestDto;
import com.metamong.movie.dto.FavoriteResponseDto;
import com.metamong.movie.entity.Favorite;
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
public class FavoriteRepository {
    private final JdbcTemplate jdbcTemplate;

    public Favorite save(Favorite favorite) {
        KeyHolder keyholder = new GeneratedKeyHolder();
        String sql = "INSERT INTO favorite (username, contents) VALUES(?, ?)";
        jdbcTemplate.update(con -> {
            PreparedStatement preparedStatement = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, favorite.getMoviename());
            return preparedStatement;
        }, keyholder);
        Long id = keyholder.getKey().longValue();
        favorite.setId(id);
        return favorite;
    }

    public List<FavoriteResponseDto> getFavorites() {
        String sql = "SELECT * from favorite";
        return jdbcTemplate.query(sql, new RowMapper<FavoriteResponseDto>() {
            @Override
            public FavoriteResponseDto mapRow(ResultSet rs, int rowNum) throws SQLException {
                Long id = rs.getLong("id");
                String moviename = rs.getString("moviename");
                return new FavoriteResponseDto(id, moviename);
            }
        });
    }

    public Favorite findById(Long id) {
        String sql = "SELECT * FROM favorite WHERE id = ?";
        return jdbcTemplate.query(sql, resultSet -> {
            if (resultSet.next()) {
                Favorite favorite = new Favorite();
                favorite.setMoviename(resultSet.getString("moviename"));
                return favorite;
            } else {
                return null;
            }
        }, id);
    }

    public void delete(Long id) {
        String sql = "DELETE FROM favorite WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    public void update(Long id, FavoriteRequestDto favoriteRequestDto) {
        String sql = "UPDATE favorite SET moviename = ? WHERE id = ?";
        jdbcTemplate.update(sql, favoriteRequestDto.getMoviename(), id);
    }
}
