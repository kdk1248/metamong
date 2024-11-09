import { Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { CommentRequestDto } from '../dto/comment-request.dto';
import { CommentResponseDto, ShowCommentByIdResponseDto, ShowCommentsResponseDto } from '../dto/comment-response.dto';
import { CommentRepository } from '../repository/comment.repository';
import { Comment } from '../entity/comment.entity';
import { User } from 'src/res/user/entity/user.entity';
import { Movie } from 'src/res/movie/entity/movie.entity';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);

  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(commentRequestDto: CommentRequestDto): Promise<CommentResponseDto> {
    try {
      const comment = new Comment();
      comment.user = { id: commentRequestDto.userId } as User;
      comment.movie = { id: commentRequestDto.movieId } as Movie;
      comment.commentContent = commentRequestDto.commentContent;
      
      console.log('Saving comment:', comment); // 저장 전 로그 출력
      const savedComment = await this.commentRepository.save(comment);
      
      return new CommentResponseDto(savedComment.id, true, 'Comment added successfully.');
    } catch (error) {
      this.logger.error('Failed to create the comment', error.stack);
      throw new InternalServerErrorException('Failed to save the comment');
    }
  }
  async getCommentsByMovieId(movieId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { movie: { id: movieId } }, // 수정된 부분: movie 객체 내의 id로 조건 설정
      relations: ['user', 'movie'] // 필요한 경우 관계 로딩 설정
    });
  }
  async getComments(page: number, limit: number): Promise<ShowCommentsResponseDto[]> {
    try {
      return await this.commentRepository.getComments(page, limit);
    } catch (error) {
      this.logger.error('Failed to fetch comments', error.stack);
      throw new InternalServerErrorException('Failed to fetch comments');
    }
  }

  async getCommentById(id: number): Promise<ShowCommentByIdResponseDto> {
    const comment = await this.commentRepository.findById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return new ShowCommentByIdResponseDto(
      comment.user.id,
      comment.createdAt,
      comment.commentContent,
      comment.favoriteCount,
      comment.dislikeCount,
      comment.movie?.id,
      comment.movie?.title
    );
  }

  async updateComment(id: number, commentRequestDto: CommentRequestDto): Promise<CommentResponseDto> {
    await this.commentRepository.update(id, commentRequestDto);
    return new CommentResponseDto(id, true, 'Comment updated successfully.');
  }

  async deleteComment(id: number): Promise<CommentResponseDto> {
    await this.commentRepository.delete(id);
    return new CommentResponseDto(id, true, 'Comment deleted successfully.');
  }

  async incrementFavoriteCount(commentId: number): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }

    comment.favoriteCount += 1;
    await this.commentRepository.save(comment);
    return new CommentResponseDto(comment.id, true, 'Favorite count incremented successfully.');
  }

  async decrementFavoriteCount(commentId: number): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }

    comment.favoriteCount = Math.max(comment.favoriteCount - 1, 0);
    await this.commentRepository.save(comment);
    return new CommentResponseDto(comment.id, true, 'Favorite count decremented successfully.');
  }

  async incrementDislikeCount(commentId: number): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }

    comment.dislikeCount += 1;
    await this.commentRepository.save(comment);
    return new CommentResponseDto(comment.id, true, 'Dislike count incremented successfully.');
  }

  async decrementDislikeCount(commentId: number): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }

    comment.dislikeCount = Math.max(comment.dislikeCount - 1, 0);
    await this.commentRepository.save(comment);
    return new CommentResponseDto(comment.id, true, 'Dislike count decremented successfully.');
  }
}
