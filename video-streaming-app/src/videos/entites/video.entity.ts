import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // title: string;

  // @Column()
  // description: string;

  @Column()
  originalname: string;

  @Column()
  mimetype: string;

  @Column()
  fieldname: string;

  @Column()
  objectUrl: string;

  @Column()
  thumbNail: string;
}
