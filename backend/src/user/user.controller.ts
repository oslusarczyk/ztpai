import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/user.dto';
import { Public } from '@/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @Public()
  register(@Body() loginUserDto: LoginUserDto) {
    return this.userService.register(loginUserDto);
  }
}
