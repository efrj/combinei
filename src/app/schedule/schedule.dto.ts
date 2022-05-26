import { IsString, Length } from 'class-validator';

export class ScheduleDto {
  @IsString()
  @Length(1, 255)
  readonly name: string;
}
