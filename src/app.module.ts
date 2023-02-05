import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      schema: process.env.PG_SCHEMA || 'public',
      synchronize: process.env.NODE_ENV !== 'production',
      autoLoadEntities: true,
    }),
    PlayerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
