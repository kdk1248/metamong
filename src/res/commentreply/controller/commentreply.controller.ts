import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { CommentReplyService } from '../service/commentreply.service';
import { CommentReplyRequestDto } from '../dto/commentreply-request.dto';
import { CommentReplyResponseDto } from '../dto/commentreply-response.dto';

@Controller('api/comment-replies')
export class CommentReplyController {
  constructor(private readonly commentReplyService: CommentReplyService) {}

  @Post('add')
  async addCommentReply(@Body() commentReplyRequestDto: CommentReplyRequestDto): Promise<CommentReplyResponseDto> {
    return await this.commentReplyService.addCommentReply(commentReplyRequestDto);
  }

  @Delete('remove/:id')
  async removeCommentReply(@Param('id') id: number): Promise<CommentReplyResponseDto> {
    return await this.commentReplyService.removeCommentReply(id);
  }

  @Get('comment/:commentId')
  async getCommentRepliesByCommentId(@Param('commentId') commentId: number): Promise<CommentReplyResponseDto[]> {
    return await this.commentReplyService.getCommentRepliesByCommentId(commentId);
  }
}
