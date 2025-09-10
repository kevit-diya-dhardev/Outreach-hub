import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/users.schema';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { constants } from 'buffer';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { UsersModule } from 'src/users/users.module';

//For auth configuration

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthGuard, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
