import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'apex',
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
