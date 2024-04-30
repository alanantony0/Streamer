import { Pool } from 'pg';
import { Injectable } from '@nestjs/common';
import { VideoDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../entites/video.entity';

@Injectable()
export class VideoRepository {
  private readonly pool: Pool;

  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async create(
    videoDto: VideoDto,
    objectUrl: string,
    thumbNail: any, //check type
  ): Promise<Video> {
    const { mimetype, originalname, fieldname } = videoDto;
    const video = this.videoRepository.create({
      originalname,
      fieldname,
      mimetype,
      objectUrl,
      thumbNail,
    });

    return this.videoRepository.save(video);
  }

  async getVideosByMimeType(mimeType: string): Promise<Video[]> {
    return this.videoRepository
      .createQueryBuilder('video')
      .where('video.mimeType = :mimeType', { mimeType })
      .getMany();
  }
}
