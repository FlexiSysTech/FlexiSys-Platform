import { ApiProperty } from '@nestjs/swagger';

export class BiTrendPointEntity {
  constructor(partial: Partial<BiTrendPointEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  timestamp!: Date;

  @ApiProperty()
  value!: number;

  @ApiProperty()
  change!: number;

  @ApiProperty()
  changePercent!: number;
}

export class BiTrendEntity {
  constructor(partial: Partial<BiTrendEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  subjectId!: string;

  @ApiProperty()
  latestValue!: number;

  @ApiProperty()
  averageValue!: number;

  @ApiProperty()
  direction!: string;

  @ApiProperty({ type: [BiTrendPointEntity] })
  points!: BiTrendPointEntity[];
}
