import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { DirectorRequestDto } from '../dto/director-request.dto';

@Entity('director')
export class Director extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'timestamp', nullable: true })
    createdAt: Date;

    constructor(directorRequestDto: DirectorRequestDto) {
        super();
        this.id = directorRequestDto.id;
        this.name = directorRequestDto.name;
    }

    update(directorRequestDto: DirectorRequestDto) {
        this.id = directorRequestDto.id;
        this.name = directorRequestDto.name;
    }
}
