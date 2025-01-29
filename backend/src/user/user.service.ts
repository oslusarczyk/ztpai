import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service';
import { LoginUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async loginUser(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password not found');
    }
    return user;
  }

  async register(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }
}
