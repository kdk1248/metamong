import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { MovieRequestDto } from '../dto/movie-request.dto';

@Entity('movie')
export class MovieEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'bigint' })
    directorId: number;

    @Column({ type: 'varchar', length: 100 })
    genre: string;

    @Column({ type: 'text' })
    contents: string;

    @Column({ type: 'varchar', length: 255 })
    posterUrl: string;

    @Column({ type: 'int' })
    favorite: number;

    @Column({ type: 'int' })
    runningTime: number;

    @Column({ type: 'timestamp', nullable: true })
    releasedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    modifiedAt: Date;

    constructor(movieRequestDto: MovieRequestDto) {
        super();
        this.title = movieRequestDto.title;
        this.directorId = movieRequestDto.directorId;
        this.genre = movieRequestDto.genre;
        this.contents = movieRequestDto.contents;
        this.posterUrl = movieRequestDto.posterUrl;
        this.favorite = movieRequestDto.favorite;
        this.runningTime = movieRequestDto.runningTime;
    }

    update(movieRequestDto: MovieRequestDto) {
        this.title = movieRequestDto.title;
        this.directorId = movieRequestDto.directorId;
        this.genre = movieRequestDto.genre;
        this.contents = movieRequestDto.contents;
        this.posterUrl = movieRequestDto.posterUrl;
        this.favorite = movieRequestDto.favorite;
        this.runningTime = movieRequestDto.runningTime;
    }
}