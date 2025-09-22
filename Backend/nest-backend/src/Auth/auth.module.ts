import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/users.schema';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { constants } from 'buffer';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { AdminRoleGuard } from './Roles/adminRole.guard';
import { UsersModule } from 'src/users/users.module';
import { Auth, AuthSchema } from './auth.schema';
import { UserRoleGuard } from './Roles/userRole.guard';

//For auth configuration

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, AuthGuard, AdminRoleGuard, UserRoleGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard, AdminRoleGuard, UserRoleGuard],
})
export class AuthModule {}
