import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { VideoRepository } from './repository/video.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entites/video.entity';
import { SharedModule } from 'src/shared/shared.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video]),
    SharedModule,
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        throttlers: [
          {
            ttl: config.get('UPLOAD_RATE_TTL') as number,
            limit: config.getOrThrow('UPLOAD_RATE_LIMIT') as number,
          },
        ],
      }),
    }),
  ],
  controllers: [VideosController],
  providers: [
    VideosService,
    VideoRepository,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class VideosModule {}
