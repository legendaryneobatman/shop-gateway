import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

export interface SignInRequest {
  username: string;
  password: string;
}
export interface SignInResponse {
  accessToken?: string;
  refreshToken?: string;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() body: SignInRequest): Promise<SignInResponse> {
    return this.authService.signIn(body);
  }
}
