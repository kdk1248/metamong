import { Director } from '../entity/director';

export class DirectorResponseDto {
  id: number;
  name: string;
  createdAt: Date;

  constructor(director: Director) {
    this.id = director.id;
    this.name = director.name;
    this.createdAt = director.createdAt;
  }
}
