import { ApiProperty } from '@nestjs/swagger';

export class PermissionEntity {
  @ApiProperty({
    example: 'clx123456789',
  })
  id!: string;

  @ApiProperty({
    example: 'users',
  })
  module!: string;

  @ApiProperty({
    example: 'create',
  })
  action!: string;

  @ApiProperty({
    example: 'users.create',
  })
  code!: string;

  @ApiProperty({
    example: 'Allows creating users',
    nullable: true,
  })
  description!: string | null;

  constructor(partial: Partial<PermissionEntity>) {
    Object.assign(this, partial);
  }
}