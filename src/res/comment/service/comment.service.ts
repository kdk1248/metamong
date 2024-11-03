import { Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(CommentService.name);

  constructor(
    @Inject(CommentRepository) private readonly commentRepository: CommentRepository,
    @Inject(FavoriteRepository) private readonly favoriteRepository: FavoriteRepository,
  ) {}

  async createComment(commentRequestDto: CommentRequestDto): Promise<CommentResponseDto> {
    this.logger.verbose(`Creating a new comment: ${JSON.stringify(commentRequestDto)}`);
    try {
      const comment = new Comment(commentRequestDto);
      const savedComment = await this.commentRepository.save(comment);
      this.logger.verbose(`Comment created with ID: ${savedComment.id}`);
      return new CommentResponseDto(
        savedComment.id,
        savedComment.user ? savedComment.user.id : null,
        savedComment.content,
        savedComment.favoriteCount,
        savedComment.dislikeCount
      );
    } catch (error) {
      this.logger.error('Error creating comment', error.stack);
      throw new InternalServerErrorException('Failed to create the comment');
    }
  }

  async getComments(page: number, limit: number): Promise<CommentResponseDto[]> {
    this.logger.verbose(`Fetching comments for page: ${page}, limit: ${limit}`);
    try {
      return await this.commentRepository.getComments(page, limit);
    } catch (error) {
      this.logger.error('Error fetching comments', error.stack);
      throw new InternalServerErrorException('Failed to fetch comments');
    }
  }

  async getCommentById(id: number): Promise<CommentResponseDto> {
    this.logger.verbose(`Fetching comment with ID: ${id}`);
    try {
      const comment = await this.commentRepository.findById(id);
      if (!comment) {
        this.logger.warn(`Comment with ID ${id} not found`);
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }

      const userId = comment.user ? comment.user.id : null;
      this.logger.verbose(`Comment with ID ${id} fetched successfully`);
      return new CommentResponseDto(
        comment.id,
        userId,
        comment.content,
        comment.favoriteCount,
        comment.dislikeCount
      );
    } catch (error) {
      this.logger.error(`Error fetching comment with ID ${id}:`, error.stack);
      throw new InternalServerErrorException('An error occurred while fetching the comment');
    }
  }

  async updateComment(id: number, commentRequestDto: CommentRequestDto): Promise<number> {
    this.logger.verbose(`Updating comment with ID: ${id}`);
    try {
      const comment = await this.commentRepository.findById(id);
      if (!comment) {
        this.logger.warn(`Comment with ID ${id} not found`);
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }
      comment.update(commentRequestDto);
      await this.commentRepository.save(comment);
      this.logger.verbose(`Comment with ID ${id} updated successfully`);
      return id;
    } catch (error) {
      this.logger.error(`Error updating comment with ID ${id}:`, error.stack);
      throw new InternalServerErrorException('Failed to update the comment');
    }
  }

  async deleteComment(id: number): Promise<number> {
    this.logger.verbose(`Deleting comment with ID: ${id}`);
    try {
      const comment = await this.commentRepository.findById(id);
      if (!comment) {
        this.logger.warn(`Comment with ID ${id} not found`);
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }
      await this.commentRepository.delete(id);
      this.logger.verbose(`Comment with ID ${id} deleted successfully`);
      return id;
    } catch (error) {
      this.logger.error(`Error deleting comment with ID ${id}:`, error.stack);
      throw new InternalServerErrorException('Failed to delete the comment');
    }
  }

  async favoriteCountComment(commentId: number): Promise<CommentResponseDto> {
    this.logger.verbose(`Incrementing favorite count for comment with ID: ${commentId}`);
    try {
      const comment = await this.commentRepository.findById(commentId);
      if (!comment) {
        this.logger.warn(`Comment with ID ${commentId} not found`);
        throw new NotFoundException('Comment not found');
      }
      comment.favoriteCount++;
      await this.commentRepository.save(comment);
      return new CommentResponseDto(
        comment.id,
        comment.user ? comment.user.id : null,
        comment.content,
        comment.favoriteCount,
        comment.dislikeCount
      );
    } catch (error) {
      this.logger.error(`Error incrementing favorite count for comment ID ${commentId}:`, error.stack);
      throw new InternalServerErrorException('Failed to increment favorite count');
    }
  }

  async unfavoriteCountComment(commentId: number): Promise<CommentResponseDto> {
    this.logger.verbose(`Decrementing favorite count for comment with ID: ${commentId}`);
    try {
      const comment = await this.commentRepository.findById(commentId);
      if (!comment) {
        this.logger.warn(`Comment with ID ${commentId} not found`);
        throw new NotFoundException('Comment not found');
      }
      comment.favoriteCount = Math.max(comment.favoriteCount - 1, 0);
      await this.commentRepository.save(comment);
      return new CommentResponseDto(
        comment.id,
        comment.user ? comment.user.id : null,
        comment.content,
        comment.favoriteCount,
        comment.dislikeCount
      );
    } catch (error) {
      this.logger.error(`Error decrementing favorite count for comment ID ${commentId}:`, error.stack);
      throw new InternalServerErrorException('Failed to decrement favorite count');
    }
  }

  async dislikeCountComment(commentId: number): Promise<CommentResponseDto> {
    this.logger.verbose(`Incrementing dislike count for comment with ID: ${commentId}`);
    try {
      const comment = await this.commentRepository.findById(commentId);
      if (!comment) {
        this.logger.warn(`Comment with ID ${commentId} not found`);
        throw new NotFoundException('Comment not found');
      }
      comment.dislikeCount++;
      await this.commentRepository.save(comment);
      return new CommentResponseDto(
        comment.id,
        comment.user ? comment.user.id : null,
        comment.content,
        comment.favoriteCount,
        comment.dislikeCount
      );
    } catch (error) {
      this.logger.error(`Error incrementing dislike count for comment ID ${commentId}:`, error.stack);
      throw new InternalServerErrorException('Failed to increment dislike count');
    }
  }

  async undislikeCountComment(commentId: number): Promise<CommentResponseDto> {
    this.logger.verbose(`Decrementing dislike count for comment with ID: ${commentId}`);
    try {
      const comment = await this.commentRepository.findById(commentId);
      if (!comment) {
        this.logger.warn(`Comment with ID ${commentId} not found`);
        throw new NotFoundException('Comment not found');
      }
      comment.dislikeCount = Math.max(comment.dislikeCount - 1, 0);
      await this.commentRepository.save(comment);
      return new CommentResponseDto(
        comment.id,
        comment.user ? comment.user.id : null,
        comment.content,
        comment.favoriteCount,
        comment.dislikeCount
      );
    } catch (error) {
      this.logger.error(`Error decrementing dislike count for comment ID ${commentId}:`, error.stack);
      throw new InternalServerErrorException('Failed to decrement dislike count');
    }
  }
}
