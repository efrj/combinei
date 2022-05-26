import { IsString, Length, IsDateString, ValidateIf, IsOptional, IsUUID } from 'class-validator';

export class EventCreateDto {
  @IsString()
  @Length(1)
  readonly description: string;

  @IsUUID()
  readonly scheduleId: string;

  @IsDateString()
  readonly startDate: Date;

  @ValidateIf((event: EventCreateDto) => !!event.endDate && event.endDate !== null)
  @IsDateString()
  @IsOptional()
  readonly endDate?: Date;

  @IsOptional()
  readonly time?: Date;

  @IsOptional()
  readonly isPaid?: boolean;

  @IsOptional()
  readonly isCanceled?: boolean;

  @IsOptional()
  readonly isMissed?: boolean;

  @IsString()
  @IsOptional()
  @Length(1)
  readonly justification?: string;
}

export class EventEditDto {
  @IsString()
  @Length(1)
  readonly description: string;

  @IsDateString()
  readonly startDate: Date;

  @ValidateIf((event: EventCreateDto) => !!event.endDate && event.endDate !== null)
  @IsDateString()
  @IsOptional()
  readonly endDate?: Date;

  @IsOptional()
  readonly time?: Date;

  @IsOptional()
  readonly isPaid?: boolean;

  @IsOptional()
  readonly isCanceled?: boolean;

  @IsOptional()
  readonly isMissed?: boolean;

  @IsString()
  @IsOptional()
  @Length(1)
  readonly justification?: string;
}
