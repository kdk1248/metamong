import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from '../entity/favorite.entity';
import { Movie } from 'src/res/movie/entity/movie.entity';
import { FavoriteRequestDto } from '../dto/favorite-request.dto';
import { User } from 'src/res/user/entity/user.entity';
import { Comment } from 'src/res/comment/entity/comment.entity';
import { Collection } from 'src/res/collection/entity/collection.entity';
import { CommentService } from 'src/res/comment/service/comment.service';

@Injectable()
export class FavoriteRepository {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    @Inject(forwardRef(() => CommentService))
    private readonly commentService: CommentService,
  ) { }

  async addFavorite(favoriteRequestDto: FavoriteRequestDto): Promise<Favorite> {
    const user = await this.userRepository.findOne({ where: { id: favoriteRequestDto.userId } });
    const movie = favoriteRequestDto.movieId ? await this.movieRepository.findOne({ where: { id: favoriteRequestDto.movieId } }) : null;
    const comment = favoriteRequestDto.commentId ? await this.commentRepository.findOne({ where: { id: favoriteRequestDto.commentId } }) : null;
    const collection = favoriteRequestDto.collectionId ? await this.collectionRepository.findOne({ where: { id: favoriteRequestDto.collectionId } }) : null;

    if (!user || (!movie && !comment && !collection)) {
      throw new Error('Invalid user or target ID');
    }

    const favorite = this.favoriteRepository.create({
      user,
      movie,
      comment,
      collection,
      addedAt: new Date(),
    });

    try {
      return await this.favoriteRepository.save(favorite);
    } catch (error) {
      throw new Error('실패: ' + error.message);
    }
  }

  async removeFavorite(id: number): Promise<void> {
    await this.favoriteRepository.delete(id);
  }

  async findByUserAndTarget(userId: number, movieId?: number, commentId?: number, collectionId?: number): Promise<Favorite | null> {
    return await this.favoriteRepository.findOne({
      where: {
        user: { id: userId },
        ...(movieId && { movie: { id: movieId } }),
        ...(commentId && { comment: { id: commentId } }),
        ...(collectionId && { collection: { id: collectionId } }),
      },
    });
  }

  async findAllByUser(userId: number): Promise<Favorite[]> {
    return await this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['movie', 'comment', 'collection'],
    });
  }

  async findById(id: number): Promise<Favorite | null> {
    return await this.favoriteRepository.findOne({
      where: { id },
      relations: ['movie', 'comment', 'collection'],
    });
  }
}
