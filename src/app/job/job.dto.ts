import { IsString, Length, IsOptional, IsNumber } from 'class-validator';

export class JobDto {
  @IsString()
  @Length(1, 100)
  readonly name: string;

  @IsString()
  @IsOptional()
  @Length(1)
  readonly description: string;

  @IsNumber()
  amount: number;
}
