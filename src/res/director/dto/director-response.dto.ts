import { DirectorEntity } from '../entity/director.entity';

export class DirectorResponseDto {
  id: number;
  name: string;
  createdAt: Date;

  constructor(director: DirectorEntity) {
    this.id = director.id;
    this.name = director.name;
    this.createdAt = director.createdAt;
  }
}
