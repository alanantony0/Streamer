import { Request, Post, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // login(@Body() credentials: { username: string; password: string }) {
  //   return this.authService.login(credentials.username, credentials.password);
  // }

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log(req.user, 'req');
    return this.authService.login(req.user);
  }
}
