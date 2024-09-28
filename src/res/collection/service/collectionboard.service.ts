import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionBoard } from '../entity/collectionboard.entity';
import { CollectionBoardRequestDto } from '../dto/collectionboard-request.dto';

@Injectable()
export class CollectionBoardService {
  constructor(
    @InjectRepository(CollectionBoard)
    private readonly boardRepository: Repository<CollectionBoard>,
  ) {}

  // CREATE
  async createBoard(requestDto: CollectionBoardRequestDto): Promise<CollectionBoard> {
    const board = this.boardRepository.create(requestDto);
    return this.boardRepository.save(board);
  }

  // READ
  async getAllBoards(): Promise<CollectionBoard[]> {
    return this.boardRepository.find({ order: { createdAt: 'DESC' }, relations: ['collection', 'user'] });
  }

  async getBoardById(id: number): Promise<CollectionBoard> {
    const board = await this.boardRepository.findOne({ where: { id }, relations: ['collection', 'user'] });
    if (!board) {
      throw new NotFoundException(`게시물이 존재하지 않습니다.`);
    }
    return board;
  }

  // UPDATE
  async updateBoard(id: number, requestDto: CollectionBoardRequestDto): Promise<CollectionBoard> {
    const board = await this.getBoardById(id);
    this.boardRepository.merge(board, requestDto);
    return this.boardRepository.save(board);
  }

  // DELETE
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`게시물이 존재하지 않습니다.`);
    }
  }
}
