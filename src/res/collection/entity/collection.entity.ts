import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { Favorite } from 'src/res/favorite/entity/favorite.entity';
import { Movie } from 'src/res/movie/entity/movie.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CollectionRequestDto } from '../dto/collection-request.dto';

@Entity()
export class Collection extends CommonBigPKEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @OneToMany(() => Favorite, (favorite) => favorite.collection)
    favorites: Favorite[];

    @Column({ type: 'int' })
    userId: number;

    @ManyToMany(() => Movie, (movie) => movie.collections)
    @JoinTable()
    movies: Movie[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    modifiedAt: Date;

    constructor(collectionRequestDto: CollectionRequestDto) {
        super();
        if (collectionRequestDto) {
            this.name = collectionRequestDto.name;
            this.userId = collectionRequestDto.userId[0];
        }
    }

    update(collectionRequestDto: CollectionRequestDto) {
        this.name = collectionRequestDto.name;
        this.userId = collectionRequestDto.userId[0];
    }
}
