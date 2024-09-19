import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentReplyRequestDto } from '../dto/commentreply-request.dto';
import { CommentReply } from '../entity/commentreply.entity';

@Injectable()
export class CommentReplyRepository {
  constructor(
    @InjectRepository(CommentReply)
    private readonly commentReplyRepository: Repository<CommentReply>,
  ) {}

  async addCommentReply(
    commentReplyRequestDto: CommentReplyRequestDto,
  ): Promise<CommentReply> {
    const commentReply = this.commentReplyRepository.create({
      user: { id: commentReplyRequestDto.userId },
      comment: { id: commentReplyRequestDto.commentId },
      content: commentReplyRequestDto.content,
    });
    return await this.commentReplyRepository.save(commentReply);
  }

  async removeCommentReply(id: number): Promise<void> {
    await this.commentReplyRepository.delete(id);
  }

  async findById(id: number): Promise<CommentReply | null> {
    return await this.commentReplyRepository.findOne({ where: { id } });
  }

  async findByCommentId(commentId: number): Promise<CommentReply[]> {
    return await this.commentReplyRepository.find({
      where: { comment: { id: commentId } },
      relations: ['user'],
    });
  }
}
