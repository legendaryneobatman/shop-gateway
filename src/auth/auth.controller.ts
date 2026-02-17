import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

export interface SignInRequest {
  username: string;
  password: string;
}
export interface SignInResponse {
  accessToken?: string;
  refreshToken?: string;
}

export interface SignUpRequest {
  name: string;
  username: string;
  password: string;
}
export interface SignUpResponse {
  id?: number;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() body: SignInRequest): Promise<SignInResponse> {
    return this.authService.SignIn(body);
  }
  @Post('sign-up')
  signUp(@Body() body: SignUpRequest): Promise<SignUpResponse> {
    return this.authService.SignUp(body);
  }
}
