import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirectorEntity } from '../entity/director.entity';
import { DirectorRequestDto } from '../dto/director-request.dto';
import { DirectorResponseDto } from '../dto/director-response.dto';

@Injectable()
export class DirectorService {
    constructor(
        @InjectRepository(DirectorEntity)
        private readonly directorRepository: Repository<DirectorEntity>,
    ) {}

    async createDirector(directorRequestDto: DirectorRequestDto): Promise<DirectorResponseDto> {
        const director = this.directorRepository.create(directorRequestDto);
        const savedDirector = await this.directorRepository.save(director);
        return new DirectorResponseDto(savedDirector);
    }

    async getDirectors(): Promise<DirectorResponseDto[]> {
        const directors = await this.directorRepository.find({
            order: {
                createdAt: 'DESC',
            },
        });
        return directors.map(director => new DirectorResponseDto(director));
    }

    async deleteDirector(id: number): Promise<void> {
        const result = await this.directorRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Director with id ${id} not found`);
        }
    }
}
