import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type {
  LogoutRequestDTO,
  RefreshRequestDTO,
  RefreshResponseDTO,
  SignInRequestDTO,
  SignInResponseDTO,
  SignUpRequestDTO,
  SignUpResponseDTO,
} from './auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() body: SignInRequestDTO): Promise<SignInResponseDTO> {
    return this.authService.signIn(body);
  }
  @Post('sign-up')
  signUp(@Body() body: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    return this.authService.signUp(body);
  }
  @Post('refresh')
  refresh(@Body() body: RefreshRequestDTO): Promise<RefreshResponseDTO> {
    return this.authService.refresh(body);
  }
  @Post('logout')
  logout(@Body() body: LogoutRequestDTO) {
    return this.authService.logout(body);
  }
  @Post('logout-all')
  logoutAll() {}
}
