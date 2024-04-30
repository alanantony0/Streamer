import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;
    return this.userRepository.save(user);
  }

  async getUser(query: object): Promise<User | undefined> {
    return this.userRepository.findOne(query);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username, password } });
  }
}
