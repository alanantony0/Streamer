import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(username: string, password: string): Promise<any> {
    console.log('userName', username, password);

    const user = await this.userRepository.create({
      username,
      password,
    });

    return this.userRepository.save(user);
    // return null
  }
}
