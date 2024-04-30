import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  private readonly configService: ConfigService;
  private readonly s3Client = new S3Client();

  constructor(configService: ConfigService) {
    this.configService = configService;
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
    });
  }

  async uploadVideo(video, thumbnail) {
    const awsVideoUpload = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: `${this.configService.getOrThrow('AWS_BUCKET_NAME')}`,
        ContentType: 'video/mp4',
        // ACL: 'public-read',
        Key: video?.originalname,
        Body: video?.buffer,
      }),
    );

    const awsThumbnailUpload = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: `${this.configService.getOrThrow('AWS_BUCKET_NAME')}`,
        ContentType: 'image/jpeg',
        Key: thumbnail?.originalname,
        Body: thumbnail?.buffer,
      }),
    );

    const thumbnailUrl = `${this.configService.getOrThrow('CLOUDFRONT_DISTRIBUTION')}/${thumbnail.originalname}`;
    const objectUrl = `${this.configService.getOrThrow('CLOUDFRONT_DISTRIBUTION')}/${video.originalname}`;

    return { awsVideoUpload, objectUrl, thumbnailUrl, awsThumbnailUpload };
  }

  async getVideoList() {
    const params = {
      Bucket: `${this.configService.getOrThrow('AWS_BUCKET_NAME')}`,
    };
    try {
      const command = new ListObjectsCommand(params);
      const response = await this.s3Client.send(command);

      const videos = response.Contents?.map((object) => object?.Key) || [];
      return videos;
    } catch (error) {
      console.error('Error fetching videos from S3:', error);
      throw new Error('Failed to fetch videos from S3');
    }
  }
}
