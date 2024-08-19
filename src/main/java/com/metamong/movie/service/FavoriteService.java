package com.metamong.movie.service;

import com.metamong.movie.dto.FavoriteRequestDto;
import com.metamong.movie.dto.FavoriteResponseDto;
import com.metamong.movie.entity.Favorite;
import com.metamong.movie.repository.FavoriteRepository;
import org.springframework.stereotype.Component;

import java.nio.channels.IllegalChannelGroupException;
import java.util.List;

@Component
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository){
        this.favoriteRepository = favoriteRepository;
    }
    public FavoriteResponseDto createFavorite(FavoriteRequestDto favoriteRequestDto) {
        Favorite favorite = new Favorite(favoriteRequestDto);

        Favorite saveFavorite = favoriteRepository.save(favorite);

        FavoriteResponseDto favoriteResponseDto = new FavoriteResponseDto(saveFavorite);

        return favoriteResponseDto;
    }

    public Long deleteFavorite(Long id) {
        Favorite favorite = favoriteRepository.findById(id);
        if(favorite != null){
            favoriteRepository.delete(id);
            return id;
        }else{
            throw new IllegalArgumentException("선택한 영화는 존재하지 않습니다");
        }
    }

    public List<FavoriteResponseDto> getFavourites() {
        List<FavoriteResponseDto> favoriteResponseDtos = favoriteRepository.getFavorites();
        return favoriteResponseDtos;
    }

    public Long updateFavorite(Long id, FavoriteRequestDto favoriteRequestDto) {
        Favorite favorite = favoriteRepository.findById(id);
        if(favorite != null){
            favoriteRepository.update(id, favoriteRequestDto);
            return id;
        }else{
            throw new IllegalArgumentException("선택한 영화는 존재하지 않습니다");
        }
    }
}
