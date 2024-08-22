import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { DirectorService } from '../service/director.service';
import { DirectorRequestDto } from '../dto/director-request.dto';
import { DirectorResponseDto } from '../dto/director-response.dto';

@Controller('api/directors')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post()
  createDirector(@Body() directorRequestDto: DirectorRequestDto): Promise<DirectorResponseDto> {
    return this.directorService.createDirector(directorRequestDto);
  }

  @Get()
  getDirectors(): Promise<DirectorResponseDto[]> {
    return this.directorService.getDirectors();
  }

  @Delete(':id')
  async deleteDirector(@Param('id') id: number): Promise<void> {
    await this.directorService.deleteDirector(id);
  }
}
