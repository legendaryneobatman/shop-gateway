import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

const shopAuthUrl = `${process.env.SHOP_AUTH_CONTAINER_NAME}:${process.env.SHOP_AUTH_EXPOSE_PORT}`;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          onLoadPackageDefinition: () => {
            console.log(shopAuthUrl);
          },
          url: shopAuthUrl,
          package: 'contracts.v1',
          protoPath: join(
            __dirname,
            '../../shop-proto-repo/api/auth/v1/contracts.proto',
          ),
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
