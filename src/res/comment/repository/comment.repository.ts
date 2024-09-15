import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentRequestDto } from '../dto/comment-request.dto';
import { CommentResponseDto } from '../dto/comment-response.dto';
import { Comment } from '../entity/comment.entity';

@Injectable() // 의존성 주입
export class CommentRepository {
  findOne(id: number) {
    throw new Error("Method not implemented.");
  }
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

  async getComments(): Promise<CommentResponseDto[]> {
    try {
      const comments = await this.commentRepository.find({ relations: ['user'] }); // 'user' relation 추가
      return comments.map(
        (comment) =>
          new CommentResponseDto(comment.id, comment.user.username, comment.content),
      );
    } catch (error) {
      throw new Error('Failed to retrieve comments');
    }
  }

  async update(id: number, commentRequestDto: CommentRequestDto): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['user'] });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    try {
      // CommentRequestDto의 내용을 엔티티에 반영
      comment.content = commentRequestDto.content;
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
      const comment = await this.commentRepository.findOne({ where: { id }, relations: ['user'] });
      if (!comment) {
        return null;
      }
      return comment;
    } catch (error) {
      throw new Error(`Failed to find the comment with ID ${id}`);
    }
  }
}
