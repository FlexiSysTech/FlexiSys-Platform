import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BiPredictionModelType,
  BiPredictionRunStatus,
  BiPredictionStatus,
} from '@prisma/client';

export class BiPredictionModelEntity {
  constructor(partial: Partial<BiPredictionModelEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ enum: BiPredictionModelType })
  modelType!: BiPredictionModelType;

  @ApiProperty()
  targetType!: string;

  @ApiProperty({ enum: BiPredictionStatus })
  status!: BiPredictionStatus;
}

export class BiPredictionRunEntity {
  constructor(partial: Partial<BiPredictionRunEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id!: string;

  @ApiProperty()
  modelId!: string;

  @ApiProperty({ enum: BiPredictionRunStatus })
  status!: BiPredictionRunStatus;

  @ApiPropertyOptional({ nullable: true })
  predictedValue!: unknown;

  @ApiPropertyOptional({ nullable: true })
  confidence!: unknown;

  @ApiProperty()
  forecastStart!: Date;

  @ApiProperty()
  forecastEnd!: Date;
}
