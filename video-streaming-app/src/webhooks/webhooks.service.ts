import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/repository/user.respository';

@Injectable()
export class WebhooksService {
  // private readonly userRepository: UserRepository;
  constructor(private readonly userRepository: UserRepository) {}

  async signIn(username: string, password: string) {
    console.log(username, password);
    const signedUser = await this.userRepository.signUp(username, password);
    return signedUser;
  }
}
