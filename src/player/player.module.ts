import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { Player } from './player.entity';

@Module({
  controllers: [PlayerController],
  providers: [PlayerService],
  imports: [TypeOrmModule.forFeature([Player])],
})
export class PlayerModule {}
