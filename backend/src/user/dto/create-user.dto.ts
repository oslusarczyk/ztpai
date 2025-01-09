import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2, { message: 'Hasło musi mieć więcej niz 8 znaków.' })
  password: string;
}
