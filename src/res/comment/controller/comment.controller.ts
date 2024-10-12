import { Controller, Post, Get, Put, Delete, Body, Param, Query } from '@nestjs/common';
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

  /**
   * 모든 댓글 조회
   * @returns Promise<CommentResponseDto[]>
   */
  @Get() // GET 요청 처리
  async getComments(
    @Query('page') page: number = 1, // 기본 페이지 1
    @Query('limit') limit: number = 10, // 기본 limit 10
  ): Promise<CommentResponseDto[]> {
    return await this.commentService.getComments(page, limit);
  }

  /**
   * 특정 댓글 조회
   * @param id
   * @returns Promise<CommentResponseDto>
   */
  @Get(':id') // 특정 댓글 조회를 위한 경로
  async getCommentById(@Param('id') id: number): Promise<CommentResponseDto> {
    return await this.commentService.getCommentById(id);
  }

  @Put(':id') // 특정 댓글 수정
  async updateComment(
    @Param('id') id: number,
    @Body() commentRequestDto: CommentRequestDto,
  ): Promise<number> {
    return await this.commentService.updateComment(id, commentRequestDto);
  }

  @Delete(':id') // 특정 댓글 삭제
  async deleteComment(@Param('id') id: number): Promise<number> {
    return await this.commentService.deleteComment(id);
  }

  // 좋아요 싫어요
  @Post(':id/favorite')
  async favoriteCountComment(@Param('id') id: number): Promise<CommentResponseDto> {
      return this.favoriteCountComment(id); // 기존 좋아요 추가 메서드 호출
  }

  @Delete(':id/favorite')
  async unfavoriteCountComment(@Param('id') id: number): Promise<CommentResponseDto> {
      return this.unfavoriteCountComment(id); // 새로 추가한 좋아요 취소 메서드 호출
  }

  @Post(':id/dislike')
  async dislikeCountComment(@Param('id') id: number): Promise<CommentResponseDto> {
      return this.dislikeCountComment(id); // 기존 싫어요 추가 메서드 호출
  }

  @Delete(':id/dislike')
  async undislikeCountComment(@Param('id') id: number): Promise<CommentResponseDto> {
      return this.undislikeCountComment(id); // 새로 추가한 싫어요 취소 메서드 호출
  }
}
