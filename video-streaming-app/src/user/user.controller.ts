import {
  Request,
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(username, hashedPassword);
    return result;
  }

  // @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Get('status')
  // @UseGuards(AuthGuard)
  status(@Req() req: Request) {
    console.log('Inside AuthController status method');
    return req;
  }

  @Post('register')
  async register(
    @Body() userData: { username: string; password: string },
  ): Promise<string> {
    const { username, password } = userData;
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.usersService.createUser(username, password);
    return this.authService.generateJwtToken(newUser);
  }
}
