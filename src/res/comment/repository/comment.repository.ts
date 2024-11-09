import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { CommentRequestDto } from '../dto/comment-request.dto';
import { CommentResponseDto, ShowCommentsResponseDto } from '../dto/comment-response.dto';
import { Comment } from '../entity/comment.entity';
import { Movie } from 'src/res/movie/entity/movie.entity';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async save(comment: Comment): Promise<Comment> {
    try {
      return await this.commentRepository.save(comment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to save the comment');
    }
  }

  async getComments(page: number, limit: number): Promise<ShowCommentsResponseDto[]> {
    try {
      const [comments] = await this.commentRepository.findAndCount({
        relations: ['user', 'movie'],
        skip: (page - 1) * limit,
        take: limit,
      });
      return comments.map(
        (comment) =>
          new ShowCommentsResponseDto(
            comment.user.id,
            comment.createdAt,
            comment.commentContent,
            comment.favoriteCount,
            comment.dislikeCount,
            comment.movie?.id,
            comment.movie?.title
          ),
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve comments');
    }
  }

  async update(id: number, commentRequestDto: CommentRequestDto): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['movie'] });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    try {
      comment.commentContent = commentRequestDto.commentContent;
      comment.movie = { id: commentRequestDto.movieId } as Movie;
      await this.commentRepository.save(comment);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update the comment with ID ${id}`);
    }
  }

  async delete(id: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    try {
      await this.commentRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to delete the comment with ID ${id}`);
    }
  }

  async findById(id: number): Promise<Comment | null> {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id },
        relations: ['user', 'movie'],
      });
      return comment || null;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to find the comment with ID ${id}`);
    }
  }

  // 새로 추가된 find 메서드
  async find(options: FindManyOptions<Comment>): Promise<Comment[]> {
    try {
      return await this.commentRepository.find(options);
    } catch (error) {
      throw new InternalServerErrorException('Failed to find comments');
    }
  }

  // 특정 movieId로 댓글 목록을 찾는 메서드 예시
  async findByMovieId(movieId: number): Promise<Comment[]> {
    try {
      return await this.commentRepository.find({
        where: { movie: { id: movieId } },
        relations: ['user', 'movie'],
      });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to find comments for movie with ID ${movieId}`);
    }
  }
}
