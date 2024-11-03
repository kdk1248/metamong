import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentRequestDto } from '../dto/comment-request.dto';
import { CommentResponseDto } from '../dto/comment-response.dto';
import { Comment } from '../entity/comment.entity';
import { Movie } from 'src/res/movie/entity/movie.entity';

@Injectable() // 의존성 주입
export class CommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async save(comment: Comment): Promise<Comment> {
    try {
      return await this.commentRepository.save(comment);
    } catch (error) {
      throw new Error('Failed to save the comment');
    }
  }

  async getComments(page: number, limit: number): Promise<CommentResponseDto[]> {
    console.log(`Fetching comments - Page: ${page}, Limit: ${limit}`);
    try {
      const [comments, total] = await this.commentRepository.findAndCount({
        relations: ['user'],
        skip: (page - 1) * limit,
        take: limit,
      });
      console.log(`Total Comments: ${total}, Comments Fetched: ${comments.length}`);
      return comments.map(
        (comment) =>
          new CommentResponseDto(
            comment.id,
            comment.user ? comment.user.id : null, // user의 id를 사용
            comment.content,
            comment.favoriteCount,
            comment.dislikeCount,
          ),
      );
    } catch (error) {
      console.error('Error retrieving comments:', error);
      throw new Error('Failed to retrieve comments');
    }
  }

  async update(id: number, commentRequestDto: CommentRequestDto): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['user', 'movie'] }); // 'movie' 관계 포함
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  
    try {
      // CommentRequestDto의 내용을 엔티티에 반영
      comment.content = commentRequestDto.content;
      comment.movie = { id: commentRequestDto.movieId } as Movie; // movieId 업데이트
      await this.commentRepository.save(comment);
    } catch (error) {
      throw new Error(`Failed to update the comment with ID ${id}`);
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
      throw new Error(`Failed to delete the comment with ID ${id}`);
    }
  }

  async findById(id: number): Promise<Comment | null> {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id },
        relations: ['user'], // user 관계를 포함하여 조회
      });
      if (!comment) {
        return null;
      }
      return comment;
    } catch (error) {
      console.error('Error finding comment by ID:', error);
      throw new Error(`Failed to find the comment with ID ${id}`);
    }
  }
}
