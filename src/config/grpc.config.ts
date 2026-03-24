import { join } from 'path';
import { USER_V1_PACKAGE_NAME } from '@legendaryneobatman/shop-proto-repo/gen/nest/api/v1/user';
import { AUTH_V1_PACKAGE_NAME } from '@legendaryneobatman/shop-proto-repo/gen/nest/api/v1/auth';

const PROTO_BASE_PATH = join(
  process.cwd(),
  'node_modules/@legendaryneobatman/shop-proto-repo/api',
);

type Paths = Record<string, string>;

export class GRPCProtoConfig {
  private static readonly packages = [
    AUTH_V1_PACKAGE_NAME,
    USER_V1_PACKAGE_NAME,
  ];

  private static readonly paths: Paths = {
    auth: join(PROTO_BASE_PATH, 'v1/auth.proto'),
    user: join(PROTO_BASE_PATH, 'v1/user.proto'),
  };

  static getPackages(): string[] {
    return this.packages;
  }

  static getAllPaths(): string[] {
    return Object.values(this.paths);
  }

  static getAuthPaths(): string[] {
    return [this.paths.auth];
  }

  static getUserPaths(): string[] {
    return [this.paths.user];
  }
}

export const SHOP_AUTH_URL = `${process.env.SHOP_AUTH_CONTAINER_NAME}:${process.env.SHOP_AUTH_EXPOSE_PORT}`;
