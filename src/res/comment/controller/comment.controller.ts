import { Controller, Post, Delete, Get, Param, Body, Query, BadRequestException, NotFoundException, ConflictException, Put } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CommentRequestDto } from '../dto/comment-request.dto';
import { CommentResponseDto, ShowCommentsResponseDto, ShowCommentByIdResponseDto } from '../dto/comment-response.dto';

@Controller('api/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post('add')
  async addComment(@Body() commentRequestDto: CommentRequestDto): Promise<CommentResponseDto> {
    const savedComment = await this.commentService.createComment(commentRequestDto);
    return new CommentResponseDto(
      savedComment.id,
      true,
      'Comment added successfully.'
    );
  }

  @Delete('remove/:id')
  async removeComment(@Param('id') id: number): Promise<CommentResponseDto> {
    const result = await this.commentService.deleteComment(id);
    if (!result) {
      throw new NotFoundException(`Comment with ID ${id} not found.`);
    }
    return new CommentResponseDto(result.id, true, 'Comment removed successfully.');
  }
  @Get('movie/:id')
  async getCommentsByMovieId(@Param('id') movieId: number): Promise<ShowCommentsResponseDto[]> {
    const comments = await this.commentService.getCommentsByMovieId(movieId);

    return comments.map(comment => {
      console.log('User:', comment.user);  // 디버깅용
      console.log('Movie:', comment.movie); // 디버깅용

      return new ShowCommentsResponseDto(
        comment.user?.id || 0,
        comment.createdAt,
        comment.commentContent,
        comment.favoriteCount,
        comment.dislikeCount,
        comment.movie?.id || 0,
        comment.movie?.title || 'Unknown'
      );
    });
  }



  @Get('show')
  async showComments(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<ShowCommentsResponseDto[]> {
    const comments = await this.commentService.getComments(page, limit);
    return comments.map(comment => new ShowCommentsResponseDto(
      comment.userId,
      comment.addedAt,
      comment.commentContent,
      comment.favoriteCount,
      comment.dislikeCount,
      comment.movieId,
      comment.movieTitle
    ));
  }

  @Get('show/detail/:id')
  async showCommentById(@Param('id') id: number): Promise<ShowCommentByIdResponseDto> {
    const comment = await this.commentService.getCommentById(id);
    return new ShowCommentByIdResponseDto(
      comment.userId,
      comment.addedAt,
      comment.commentContent,
      comment.favoriteCount,
      comment.dislikeCount,
      comment.movieId,
      comment.movieTitle
    );
  }

  @Put('update/:id')
  async updateComment(
    @Param('id') id: number,
    @Body() commentRequestDto: CommentRequestDto,
  ): Promise<CommentResponseDto> {
    const updatedComment = await this.commentService.updateComment(id, commentRequestDto);
    return new CommentResponseDto(
      updatedComment.id,
      true,
      'Comment updated successfully.'
    );
  }

  // Like/Dislike Operations
  @Post(':id/favorite')
  async addFavorite(@Param('id') id: number): Promise<CommentResponseDto> {
    const result = await this.commentService.incrementFavoriteCount(id);
    return new CommentResponseDto(
      result.id,
      true,
      'Favorite added successfully.'
    );
  }

  @Delete(':id/favorite')
  async removeFavorite(@Param('id') id: number): Promise<CommentResponseDto> {
    const result = await this.commentService.decrementFavoriteCount(id);
    return new CommentResponseDto(
      result.id,
      true,
      'Favorite removed successfully.'
    );
  }

  @Post(':id/dislike')
  async addDislike(@Param('id') id: number): Promise<CommentResponseDto> {
    const result = await this.commentService.incrementDislikeCount(id);
    return new CommentResponseDto(
      result.id,
      true,
      'Dislike added successfully.'
    );
  }

  @Delete(':id/dislike')
  async removeDislike(@Param('id') id: number): Promise<CommentResponseDto> {
    const result = await this.commentService.decrementDislikeCount(id);
    return new CommentResponseDto(
      result.id,
      true,
      'Dislike removed successfully.'
    );
  }
}
