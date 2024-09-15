import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CommentRequestDto } from '../dto/comment-request.dto';
import { CommentResponseDto } from '../dto/comment-response.dto';

@Controller('api') //클래스가 컨트롤러라는 데코레이터, 기본 url 경로는 api로 설정한거임
export class CommentController { //클래스 선언 리뷰 관련 api를 관리하는 역할
  constructor(private readonly commentService: CommentService) {} //생성자를 통해 CommentService 를 의존성 주입함,
  /** // commentService는 컨트롤러에서 사용가능, 비지니스 로직 수행
   * CREATE
   * @param commentRequestDto
   * @returns Promise<CommentResponseDto>
   */
  @Post('comments') // /api/comment4s 경로에 대한 요청 처리 -> 리뷰 생성과 연관
  async createComment(@Body() commentRequestDto: CommentRequestDto): Promise<CommentResponseDto> { //createComment 메서드 선언
    return await this.commentService.createComment(commentRequestDto); // 메서드 호출하고 리뷰 생성하고 결과 반환
  }

  /**
   * READ
   * @returns Promise<CommentResponseDto[]>
   */
  @Get('comments') //리뷰 조회하는 기능 
  async getComments(): Promise<CommentResponseDto[]> { //getComments메서드 선언, 비동기 함수, CommentResponseDto 배열을 반환
    return await this.commentService.getComments();
  }

  /**
   * UPDATE
   * @param id
   * @param commentRequestDto
   * @returns Promise<number>
   */
  @Put('comments/:id')
  async updateComment(
    @Param('id') id: number,
    @Body() commentRequestDto: CommentRequestDto,
  ): Promise<number> {
    return await this.commentService.updateComment(id,commentRequestDto);
  }

  /**
   * DELETE
   * @param id
   * @returns Promise<number>
   */
  @Delete('comments/:id')
  async deleteComment(@Param('id') id: number): Promise<number> {
    return await this.commentService.deleteComment(id);
  }
}
