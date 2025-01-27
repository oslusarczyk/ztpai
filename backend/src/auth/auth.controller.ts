import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from '@/user/dto/user.dto';
import { Public } from '@/decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Logowanie użytkownika' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Poprawne logowanie się użytkownika, zwrot tokena JWT',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: '150f1be8-c27e-4bd5-9104-0500e4be140b',
          email: 'user@example.com',
          has_admin_privileges: false,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Brak użytkownika o podanym adresie email lub złe hasło',
    content: {
      'application/json': {
        schema: {
          example: {
            message: 'Nie ma takiego użytkownika lub hasło jest niepoprawne',
            error: 'Unauthorized',
            statusCode: 401,
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Złe hasło',
    content: {
      'application/json': {
        schema: {
          example: {
            message: 'Hasło jest niepoprawne',
            error: 'Unauthorized',
            statusCode: 401,
          },
        },
      },
    },
  })
  @ApiBody({
    description: 'Dane logowania użytkownika',
    type: LoginUserDto,
  })
  signIn(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.signIn(LoginUserDto);
  }
}
