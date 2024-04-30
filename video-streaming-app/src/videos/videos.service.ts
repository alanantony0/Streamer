import { HttpStatus, Injectable, Logger } from '@nestjs/common';
// import { join } from 'path';
import { VideoRepository } from './repository/video.repository';
import { ConfigService } from '@nestjs/config';
import { AwsService } from 'src/shared/aws.service';
import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { createReadStream, statSync } from 'node:fs';

@Injectable()
export class VideosService {
  private logger = new Logger(VideosService.name);
  private readonly configService: ConfigService;
  private readonly awsService: AwsService;

  private readonly videoRepository: VideoRepository;

  constructor(
    videoRepository: VideoRepository,
    configService: ConfigService,
    awsService: AwsService,
  ) {
    this.videoRepository = videoRepository;
    this.configService = configService;
    this.awsService = awsService;
  }

  async uploadVideo(
    video: Express.Multer.File,
    thumbNail: Express.Multer.File,
  ): Promise<PutObjectCommandOutput> {
    const { awsVideoUpload, objectUrl, thumbnailUrl } =
      await this.awsService.uploadVideo(video, thumbNail);
    this.logger.log(awsVideoUpload);
    this.videoRepository.create(video, objectUrl, thumbnailUrl);
    return awsVideoUpload;
  }

  async getVideoList() {
    try {
      const videoList =
        await this.videoRepository.getVideosByMimeType('video/mp4');
      console.log(videoList, 'video list');

      //from s3
      // const videoList = await this.awsService.getVideoList();
      return videoList;
    } catch (error) {
      console.error('Error fetching videos from S3:', error);
      throw new Error('Failed to fetch videos from S3');
    }
  }

  async streamVideo(id: string, headers: any, res: any) {
    const videoPath = `assets/${id}.mp4`;
    const { size } = statSync(videoPath);
    const videoRange = headers.range;
    console.log(videoRange);
    const parts = videoRange?.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 16) : size - 1;
    //If you want to have less delay when receiving video and stream,
    // you can receive more chunks from the server and increase this number.
    //Do not exceed 10 to increase server performance.
    //You can use 4 or 6 or 7 instead of 2
    //Tips: Of course, it is better to do this chunk dynamically by checking the internet speed of the user
    const chunksize = end - start + 2;
    const readStreamfile = createReadStream(videoPath, {
      start,
      end,
      highWaterMark: 60,
    });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': chunksize,
    };
    res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
    readStreamfile.pipe(res);
  }
}
