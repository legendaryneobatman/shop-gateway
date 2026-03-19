import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { AUTH_SERVICE_NAME } from '../gen/nest/api/auth/v1/auth_service';
import type {
  LogoutRequestDTO,
  RefreshRequestDTO,
  RefreshResponseDTO,
  SignInRequestDTO,
  SignInResponseDTO,
  SignUpRequestDTO,
  SignUpResponseDTO,
} from './auth.dto';

interface AuthGrpcService {
  signIn(data: SignInRequestDTO): Observable<SignInResponseDTO>;
  signUp(data: SignUpRequestDTO): Observable<SignUpResponseDTO>;
  refresh(data: RefreshRequestDTO): Observable<RefreshResponseDTO>;
  logout(data: LogoutRequestDTO): Observable<void>;
  logoutAll(): Observable<void>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private authGrpcService: AuthGrpcService;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authGrpcService =
      this.client.getService<AuthGrpcService>(AUTH_SERVICE_NAME);
  }

  async signIn(data: SignInRequestDTO): Promise<SignInResponseDTO> {
    return firstValueFrom(this.authGrpcService.signIn(data));
  }

  async signUp(data: SignUpRequestDTO) {
    return firstValueFrom(this.authGrpcService.signUp(data));
  }
  async refresh(data: RefreshRequestDTO) {
    return firstValueFrom(this.authGrpcService.refresh(data));
  }
  async logout(data: LogoutRequestDTO) {
    await firstValueFrom(this.authGrpcService.logout(data));
  }
  async logoutAll() {
    await firstValueFrom(this.authGrpcService.logoutAll());
  }
}
