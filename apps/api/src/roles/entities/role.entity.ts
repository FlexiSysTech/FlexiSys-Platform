import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoleEntity {
  @ApiProperty({
    example: 'clx123456789',
  })
  id!: string;

  @ApiProperty({
    example: 'Super Administrator',
  })
  name!: string;

  @ApiProperty({
    example: 'SUPER_ADMIN',
  })
  code!: string;

  @ApiPropertyOptional({
    example: 'Full system access',
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    example: true,
  })
  isSystem!: boolean;

  @ApiProperty({
    example: ['users.read', 'users.create'],
    type: [String],
  })
  permissions!: string[];

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
