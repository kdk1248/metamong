import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CollectionBoard } from '../entity/collectionboard.entity';

@Injectable()
export class CollectionBoardRepository extends Repository<CollectionBoard> {
  constructor(private dataSource: DataSource) {
    super(CollectionBoard, dataSource.createEntityManager());
  }

  // CREATE
  async findAllBoards(): Promise<CollectionBoard[]> {
    return this.find({ order: { createdAt: 'DESC' }, relations: ['collection', 'user'] });
  }

  // READ
  async findBoardById(id: number): Promise<CollectionBoard> {
    const board = await this.findOne({ where: { id }, relations: ['collection', 'user'] });
    if (!board) {
      throw new Error(`게시물이 존재하지 않습니다`);
    }
    return board;
  }

  async createBoard(boardData: Partial<CollectionBoard>): Promise<CollectionBoard> {
    const board = this.create(boardData);
    return this.save(board);
  }

  // UPDATE
  async updateBoard(id: number, updateData: Partial<CollectionBoard>): Promise<CollectionBoard> {
    const board = await this.findBoardById(id);
    this.merge(board, updateData);
    return this.save(board);
  }

  // DELETE
  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new Error(`게시물이 존재하지 않습니다`);
    }
  }
}
