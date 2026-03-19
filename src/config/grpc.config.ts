import { join } from 'path';

const PROTO_BASE_PATH = join(process.cwd(), 'shop-proto-repo/api');

type Paths = Record<
  string,
  { messages: string; models: string; service: string }
>;

export class GRPCProtoConfig {
  private static readonly packages = ['auth.v1', 'user.v1'];

  private static readonly paths: Paths = {
    auth: {
      messages: join(PROTO_BASE_PATH, 'auth/v1/auth_messages.proto'),
      models: join(PROTO_BASE_PATH, 'auth/v1/auth_models.proto'),
      service: join(PROTO_BASE_PATH, 'auth/v1/auth_service.proto'),
    },
    user: {
      messages: join(PROTO_BASE_PATH, 'user/v1/user_messages.proto'),
      models: join(PROTO_BASE_PATH, 'user/v1/user_models.proto'),
      service: join(PROTO_BASE_PATH, 'user/v1/user_service.proto'),
    },
  };

  static getPackages(): string[] {
    return this.packages;
  }

  static getAllPaths(): string[] {
    return Object.values(this.paths).flatMap((obj) => Object.values(obj));
  }

  static getAuthPaths(): string[] {
    return Object.values(this.paths.auth);
  }

  static getUserPaths(): string[] {
    return Object.values(this.paths.user);
  }
}

export const SHOP_AUTH_URL = `${process.env.SHOP_AUTH_CONTAINER_NAME}:${process.env.SHOP_AUTH_EXPOSE_PORT}`;

console.log('2', GRPCProtoConfig.getAllPaths());
