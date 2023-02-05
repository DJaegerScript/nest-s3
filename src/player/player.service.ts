import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {
  private s3Client: S3;

  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {
    this.s3Client = new S3();
  }

  async createPlayer(file: Express.Multer.File, name: string) {
    const { Key } = await this.s3Client
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: file.buffer,
        Key: `${uuid()}-${name}${path.extname(file.originalname)}`,
      })
      .promise();

    const createdPlayer = this.playerRepository.create({
      name,
      imageUrl: `${process.env.ASSET_URL}/${Key}`,
    });

    return createdPlayer;
  }
}
