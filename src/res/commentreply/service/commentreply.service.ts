import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentReplyRequestDto } from '../dto/commentreply-request.dto';
import { CommentReplyResponseDto } from '../dto/commentreply-response.dto';
import { CommentReply } from '../entity/commentreply.entity';
import { CommentReplyRepository } from '../repository/commentreply.repository';

@Injectable()
export class CommentReplyService {
  constructor(
    @InjectRepository(CommentReply)
    private readonly commentReplyRepository: CommentReplyRepository,
  ) {}

  async addCommentReply(
    commentReplyRequestDto: CommentReplyRequestDto,
  ): Promise<CommentReplyResponseDto> {
    const commentReply = await this.commentReplyRepository.addCommentReply(
      commentReplyRequestDto,
    );
    return new CommentReplyResponseDto(
      commentReply.id,
      commentReply.user.id,
      commentReply.comment.id,
      commentReply.content,
      commentReply.createdAt,
    );
  }

  async removeCommentReply(id: number): Promise<CommentReplyResponseDto> {
    const commentReply = await this.commentReplyRepository.findById(id);
    if (!commentReply) {
      throw new NotFoundException(`CommentReply with ID ${id} not found`);
    }

    await this.commentReplyRepository.removeCommentReply(id);
    return new CommentReplyResponseDto(
      commentReply.id,
      commentReply.user.id,
      commentReply.comment.id,
      commentReply.content,
      commentReply.createdAt,
    );
  }

  async getCommentRepliesByCommentId(
    commentId: number,
  ): Promise<CommentReplyResponseDto[]> {
    const commentReplies =
      await this.commentReplyRepository.findByCommentId(commentId);
    return commentReplies.map(
      (reply) =>
        new CommentReplyResponseDto(
          reply.id,
          reply.user.id,
          reply.comment.id,
          reply.content,
          reply.createdAt,
        ),
    );
  }
}
