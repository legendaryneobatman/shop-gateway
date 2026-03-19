import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GRPCProtoConfig, SHOP_AUTH_URL } from '../config/grpc.config';
import { join } from 'path';

console.log(GRPCProtoConfig.getAllPaths());
console.log('protoPath', join(__dirname, '../shop-proto-repo/api/'));

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: SHOP_AUTH_URL,
          package: GRPCProtoConfig.getPackages()[0],
          protoPath: GRPCProtoConfig.getAuthPaths(),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
