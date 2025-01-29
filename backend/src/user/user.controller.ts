import {
  Controller,
  Post,
  Body,
  ConflictException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/user.dto';
import { Public } from '@/decorators/public.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Rejestracja nowego konta' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Użytkownik został zarejestrowany.',
    schema: {
      example: {
        id: '150f1be8-c27e-4bd5-9104-0500e4be140b',
        email: 'newuser@example.com',
        password: '$2b$10$hashedpassword...',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Taki e-mail już istnieje',
    content: {
      'application/json': {
        schema: {
          example: {
            message: 'Taki e-mail już istnieje',
            error: 'Conflict',
            statusCode: 409,
          },
        },
      },
    },
  })
  @ApiBody({
    description: 'Dane do rejestracji',
    type: LoginUserDto,
  })
  register(@Body() loginUserDto: LoginUserDto) {
    return this.userService.register(loginUserDto);
  }
}
