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
      throw new UnauthorizedException('Nie ma takiego użytkownika');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Hasło jest niepoprawne');
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
      throw new ConflictException('Taki e-mail już istnieje');
    }
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }
}
