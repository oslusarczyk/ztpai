import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '@/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string; user: any }> {
    const user = await this.usersService.loginUser(loginUserDto);
    const payload = {
      id: user.id,
      email: user.email,
      has_admin_privileges: user.has_admin_privileges,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
