import { IsString, IsNotEmpty } from 'class-validator';

export class VideoDto {
  @IsString()
  @IsNotEmpty()
  originalname: string;

  @IsString()
  @IsNotEmpty()
  fieldname: string;

  @IsString()
  @IsNotEmpty()
  mimetype: string;
}
