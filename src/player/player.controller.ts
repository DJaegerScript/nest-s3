import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePlayerDTO } from './player.dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @UseInterceptors(FileInterceptor('playerPhoto'))
  async createPlayer(
    @UploadedFile() playerPhoto: Express.Multer.File,
    @Body() body: CreatePlayerDTO,
  ) {
    const result = await this.playerService.createPlayer(
      playerPhoto,
      body.name,
    );

    return {
      result,
    };
  }
}
