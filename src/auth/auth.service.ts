import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { type ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { AUTH_SERVICE_NAME } from '../gen/nest/api/auth/v1/contracts';

interface SignInRequest {
  username: string;
  password: string;
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

interface AuthGrpcService {
  signIn(data: SignInRequest): Observable<SignInResponse>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private authGrpcService: AuthGrpcService;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authGrpcService =
      this.client.getService<AuthGrpcService>(AUTH_SERVICE_NAME);
  }

  async signIn(data: SignInRequest): Promise<SignInResponse> {
    return firstValueFrom(this.authGrpcService.signIn(data));
  }
}
