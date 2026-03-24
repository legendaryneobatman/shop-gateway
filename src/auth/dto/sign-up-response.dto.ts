import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignUpResponseDto {
  @ApiProperty()
  @IsString()
  id: string;
}
