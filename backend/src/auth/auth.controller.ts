import {
  Body,
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '@/user/dto/create-user.dto';
import { JwtAuthGuard } from '@/guards/jwt-auth-guard';
import { Public } from '@/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.signIn(LoginUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Public()
  @Get('test')
  test() {
    return this.authService.test();
  }
}
