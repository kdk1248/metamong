import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRequestDto } from '../dto/comment-request.dto';
import { CommentResponseDto } from '../dto/comment-response.dto';
import { CommentRepository } from '../repository/comment.repository';
import { Comment } from '../entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(commentRequestDto: CommentRequestDto): Promise<CommentResponseDto> {
    const comment = new Comment(commentRequestDto); // Comment 엔티티 생성
    const savedComment = await this.commentRepository.save(comment); // DB에 저장
    return new CommentResponseDto(savedComment.id, savedComment.user.username, savedComment.content, savedComment.favoriteCount, savedComment.dislikeCount);
  }

  async getComments(page: number, limit: number): Promise<CommentResponseDto[]> {
    return await this.commentRepository.getComments(page, limit); // 페이징 처리된 댓글 조회
  }

  async getCommentById(id: number): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return new CommentResponseDto(comment.id, comment.user.username, comment.content, comment.favoriteCount , comment.dislikeCount);
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

  async favoriteCountComment(commentId: number): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    comment.favoriteCount++;
    await this.commentRepository.save(comment);
    return new CommentResponseDto(comment.id, comment.user.username, comment.content, comment.dislikeCount, comment.favoriteCount);
}


  async dislikeCountComment(commentId: number): Promise<CommentResponseDto> {
    const comment = await this.commentRepository.findById(commentId);
    if (!comment) throw new NotFoundException('Comment not found');
    comment.dislikeCount++;
    await this.commentRepository.save(comment);
    return new CommentResponseDto(comment.id, comment.user.username, comment.content, comment.favoriteCount ,comment.dislikeCount);
  }
}
