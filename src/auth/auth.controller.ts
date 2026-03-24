import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
  SignUpResponseDto,
  RefreshRequestDto,
  RefreshResponseDto,
  LogoutRequestDto,
} from './dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    type: SignInResponseDto,
    status: 200,
    description: 'token pair to access api',
  })
  @Post('sign-in')
  signIn(@Body() body: SignInRequestDto): Promise<SignInResponseDto> {
    return this.authService.signIn(body);
  }

  @Post('sign-up')
  signUp(@Body() body: SignUpRequestDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(body);
  }

  @ApiBearerAuth('JWT')
  @Post('refresh')
  refresh(@Body() body: RefreshRequestDto): Promise<RefreshResponseDto> {
    return this.authService.refresh(body);
  }

  @ApiBearerAuth('JWT')
  @Post('logout')
  logout(@Body() body: LogoutRequestDto) {
    return this.authService.logout(body);
  }

  @ApiBearerAuth('JWT')
  @Post('logout-all')
  logoutAll() {}
}
