import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInResponseDto {
  @ApiProperty()
  @IsString()
  readonly accessToken: string;

  @ApiProperty()
  @IsString()
  readonly refreshToken: string;
}
