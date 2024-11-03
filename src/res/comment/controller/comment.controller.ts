import { Controller, Post, Get, Put, Delete, Body, Param, Query, BadRequestException } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CommentRequestDto } from '../dto/comment-request.dto';
import { CommentResponseDto } from '../dto/comment-response.dto';

@Controller('api/comments') // 기본 url 경로를 /api/comments로 설정
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post() // /api/comments 경로에 대한 POST 요청 처리
  async createComment(@Body() commentRequestDto: CommentRequestDto): Promise<CommentResponseDto> {
    return await this.commentService.createComment(commentRequestDto);
  }

  @Get() // GET 요청 처리
  async getComments(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<CommentResponseDto[]> {
    return await this.commentService.getComments(page, limit);
  }

  @Get(':id') // 특정 댓글 조회
  async getCommentById(@Param('id') id: string): Promise<CommentResponseDto> {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.commentService.getCommentById(numericId);
  }

  @Put(':id')
  async updateComment(
    @Param('id') id: number,
    @Body() commentRequestDto: CommentRequestDto,
  ): Promise<number> {
    const numericId = id;
    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid ID format');
    }
    return await this.commentService.updateComment(numericId, commentRequestDto);
  }

  @Delete(':id') // 특정 댓글 삭제
  async deleteComment(@Param('id') id: number): Promise<number> {
    return await this.commentService.deleteComment(id);
  }

  // // 좋아요 싫어요
  // @Post(':id/favorite')
  // async favoriteCountComment(@Param('id') id: number): Promise<CommentResponseDto> {
  //     return this.commentService.favoriteCountComment(id);
  // }

  // @Delete(':id/favorite')
  // async unfavoriteCountComment(@Param('id') id: number): Promise<CommentResponseDto> {
  //     return this.commentService.unfavoriteCountComment(id);
  // }

  // @Post(':id/dislike')
  // async dislikeCountComment(@Param('id') id: number): Promise<CommentResponseDto> {
  //     return this.commentService.dislikeCountComment(id);
  // }

  // @Delete(':id/dislike')
  // async undislikeCountComment(@Param('id') id: number): Promise<CommentResponseDto> {
  //     return this.commentService.undislikeCountComment(id);
  // }
}
