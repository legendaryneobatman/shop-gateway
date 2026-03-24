import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GRPCProtoConfig } from '../config/grpc.config';
import { AUTH_MODULE_INJECT_TOKEN } from './inject-token';

export const SHOP_AUTH_URL = `${process.env.SHOP_AUTH_CONTAINER_NAME}:${process.env.SHOP_AUTH_EXPOSE_PORT}`;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_MODULE_INJECT_TOKEN,
        transport: Transport.GRPC,
        options: {
          url: SHOP_AUTH_URL,
          package: GRPCProtoConfig.getPackages(),
          protoPath: GRPCProtoConfig.getAllPaths(),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
