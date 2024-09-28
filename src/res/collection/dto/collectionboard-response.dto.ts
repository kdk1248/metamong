import { CollectionBoard } from '../entity/collectionboard.entity';

export class CollectionBoardResponseDto {
  id: number;
  content: string;
  like: number;
  collectionId: number;
  userId: number;
  createdAt: Date;

  constructor(board: CollectionBoard) {
    this.id = board.id;
    this.content = board.content;
    this.like = board.like;
    this.collectionId = board.collection.id;
    this.userId = board.user.id;
    this.createdAt = board.createdAt;
  }
}
