import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRequestDto } from '../dto/comment-request.dto';
import { CommentResponseDto } from '../dto/comment-response.dto';
import { Comment } from '../entity/comment.entity';
import { CommentRepository } from '../repository/comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
  ) {}

  async createComment(
    commentRequestDto: CommentRequestDto,
  ): Promise<CommentResponseDto> {
    const comment = new Comment(commentRequestDto);
    const savedComment = await this.commentRepository.save(comment);
    return new CommentResponseDto(savedComment.id, savedComment.user.username, savedComment.content);
  }

  async getComments(): Promise<CommentResponseDto[]> {
    return await this.commentRepository.getComments();
  }

  async updateComment(
    id: number,
    commentRequestDto: CommentRequestDto,
  ): Promise<number> {
    await this.commentRepository.update(id, commentRequestDto);
    return id;
  }

  async deleteComment(id: number): Promise<number> {
    await this.commentRepository.delete(id);
    return id;
  }
}