import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { DirectorRequestDto } from '../dto/director-request.dto';
import { Timestamp } from './timestamp';
import { CommonBigPKEntity } from 'src/res/review/entity/common/common.entity';

@Entity('director')
export class DirectorEntity extends CommonBigPKEntity {
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
