import { Injectable } from '@nestjs/common';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from './auth.controller';

@Injectable()
export class AuthService {
  async SignIn(body: SignInRequest) {
    const baseUrl = process.env.SHOP_BASE_URL;

    const response = await fetch(`${baseUrl}/api/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = response.json() as Promise<SignInResponse>;

    return await data;
  }

  async SignUp(body: SignUpRequest) {
    const baseUrl = process.env.SHOP_BASE_URL;

    const response = await fetch(`${baseUrl}/api/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = response.json() as Promise<SignUpResponse>;
    return await data;
  }
}
