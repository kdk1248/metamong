import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CollectionBoardService } from '../service/collectionboard.service';
import { CollectionBoardRequestDto } from '../dto/collectionboard-request.dto';
import { CollectionBoardResponseDto } from '../dto/collectionboard-response.dto';

@Controller('api/collection-boards')
export class CollectionBoardController {
  constructor(private readonly boardService: CollectionBoardService) {}

  // CREATE
  @Post()
  async createBoard(@Body() requestDto: CollectionBoardRequestDto): Promise<CollectionBoardResponseDto> {
    const createdBoard = await this.boardService.createBoard(requestDto);
    return new CollectionBoardResponseDto(createdBoard);
  }

  // READ
  @Get()
  async getAllBoards(): Promise<CollectionBoardResponseDto[]> {
    const boards = await this.boardService.getAllBoards();
    return boards.map(board => new CollectionBoardResponseDto(board));
  }

  @Get(':id')
  async getBoardById(@Param('id') id: number): Promise<CollectionBoardResponseDto> {
    const board = await this.boardService.getBoardById(id);
    return new CollectionBoardResponseDto(board);
  }

  // UPDATE
  @Put(':id')
  async updateBoard(@Param('id') id: number, @Body() requestDto: CollectionBoardRequestDto): Promise<CollectionBoardResponseDto> {
    const updatedBoard = await this.boardService.updateBoard(id, requestDto);
    return new CollectionBoardResponseDto(updatedBoard);
  }

  // DELETE
  @Delete(':id')
  async deleteBoard(@Param('id') id: number): Promise<void> {
    await this.boardService.deleteBoard(id);
  }
}
