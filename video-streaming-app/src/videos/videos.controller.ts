import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFiles,
  Header,
  Headers,
  Param,
  Res,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { Response } from 'express';
import { Throttle } from '@nestjs/throttler';
import { Video } from './entites/video.entity';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
  )
  uploadVideo(@UploadedFiles() files: Array<Express.Multer.File>) {
    const video = files['video'];
    const thumbnail = files['thumbnail'];
    return this.videosService.uploadVideo(video[0], thumbnail[0]);
  }

  @Get()
  async getVideos(): Promise<Video[]> {
    return this.videosService.getVideoList();
  }

  @Get('stream/:id')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async streamVideo(
    @Param('id') id: string,
    @Headers() headers,
    @Res() res: Response,
  ) {
    return this.videosService.streamVideo(id, headers, res);
  }
}
