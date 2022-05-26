import { IsString, Length, IsEmail } from 'class-validator';

export class UserDto {
  readonly id: string | undefined | null;

  @IsEmail()
  @Length(1)
  readonly email: string;

  @IsString()
  @Length(1)
  readonly password: string;

  @IsString()
  @Length(1)
  readonly firstName: string;

  @IsString()
  @Length(1)
  readonly lastName: string;
}
