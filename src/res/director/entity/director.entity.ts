import { CommonBigPKEntity } from 'src/res/review/entity/common/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DirectorRequestDto } from '../dto/director-request.dto';

@Entity()
export class Director extends CommonBigPKEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  constructor(directorRequestDto?: DirectorRequestDto) {
    super();
    if (directorRequestDto) {
      this.id = directorRequestDto.id;
      this.name = directorRequestDto.name;
    }
  }

  update(directorRequestDto: DirectorRequestDto) {
    this.name = directorRequestDto.name;
  }
}
