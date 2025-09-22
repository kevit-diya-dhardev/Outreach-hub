import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/users.schema';
import { AdminAuthService } from './services/admin-auth.service';
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
import { UserAuthService } from './services/user-auth.service';

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
  providers: [
    AdminAuthService,
    AuthGuard,
    UserAuthService,
    AdminRoleGuard,
    UserRoleGuard,
  ],
  controllers: [AuthController],
  exports: [
    AdminAuthService,
    AuthGuard,
    UserAuthService,
    AdminRoleGuard,
    UserRoleGuard,
  ],
})
export class AuthModule {}
