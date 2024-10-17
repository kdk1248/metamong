import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRequestDto } from '../dto/comment-request.dto';
import { CommentResponseDto } from '../dto/comment-response.dto';
import { CommentRepository } from '../repository/comment.repository';
import { Comment } from '../entity/comment.entity';
import { FavoriteRequestDto } from 'src/res/favorite/dto/favorite-request.dto';
import { FavoriteResponseDto } from 'src/res/favorite/dto/favorite-response.dto';
import { FavoriteRepository } from 'src/res/favorite/repository/favorite.repository';
import { Inject } from '@nestjs/common';

@Injectable()
export class CommentService {
  constructor(
    @Inject(CommentRepository) private readonly commentRepository: CommentRepository,
    @Inject(FavoriteRepository) private readonly favoriteRepository: FavoriteRepository,
  ) {}

  async createComment(commentRequestDto: CommentRequestDto): Promise<CommentResponseDto> {
    const comment = new Comment(commentRequestDto); // Comment 엔티티 생성
    const savedComment = await this.commentRepository.save(comment); // DB에 저장
    return new CommentResponseDto(
      savedComment.id, 
      savedComment.user.username, 
      savedComment.content, 
      savedComment.favoriteCount, 
      savedComment.dislikeCount);
  }

  async getComments(page: number, limit: number): Promise<CommentResponseDto[]> {
    return await this.commentRepository.getComments(page, limit); // 페이징 처리된 댓글 조회
  }

  async getCommentById(id: number): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return new CommentResponseDto(
      comment.id, 
      comment.user.username, 
      comment.content, 
      comment.favoriteCount , 
      comment.dislikeCount
    );
  }

  async updateComment(id: number, commentRequestDto: CommentRequestDto): Promise<number> {
    const comment = await this.commentRepository.findById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    comment.update(commentRequestDto); // Comment 엔티티 업데이트
    await this.commentRepository.save(comment); // DB에 저장
    return id;
  }

  async deleteComment(id: number): Promise<number> {
    const comment = await this.commentRepository.findById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    await this.commentRepository.delete(id); // 댓글 삭제
    return id;
  }

  // 즐겨찾기 추가, 제거
  async favoriteComment(favoriteRequestDto: FavoriteRequestDto): Promise<FavoriteResponseDto> {
    const savedFavorite = await this.favoriteRepository.addFavorite(favoriteRequestDto);
    return new FavoriteResponseDto(
      savedFavorite.id,
      true,
      '댓글이 즐겨찾기에 추가되었습니다.'
    );
  }

  async unfavoriteComment(id: number): Promise<FavoriteResponseDto> {
    const favorite = await this.favoriteRepository.findById(id);
    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }

    await this.favoriteRepository.removeFavorite(id);
    return new FavoriteResponseDto(id, true, '댓글이 즐겨찾기에서 삭제되었습니다.');
  }


  // 즐겨찾기 수 세기
  async favoriteCountComment(commentId: number): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    comment.favoriteCount++;
    await this.commentRepository.save(comment);
    return new CommentResponseDto(comment.id, comment.user.username, comment.content, comment.dislikeCount, comment.favoriteCount);
}

  async unfavoriteCountComment(commentId: number): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    
    comment.favoriteCount = Math.max(comment.favoriteCount - 1, 0);
    await this.commentRepository.save(comment);
    
    return new CommentResponseDto(comment.id, comment.user.username, comment.content, comment.dislikeCount, comment.favoriteCount);
  }

  // 싫어요 수 세기
  async dislikeCountComment(commentId: number): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    comment.dislikeCount++;
    await this.commentRepository.save(comment);
    return new CommentResponseDto(comment.id, comment.user.username, comment.content, comment.favoriteCount ,comment.dislikeCount);
  }

  async undislikeCountComment(commentId: number): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    
    comment.dislikeCount = Math.max(comment.dislikeCount - 1, 0);
    await this.commentRepository.save(comment);
    
    return new CommentResponseDto(comment.id, comment.user.username, comment.content, comment.favoriteCount, comment.dislikeCount);
  }
}
