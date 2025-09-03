import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

//Service that generates token

export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async generateToken(authData: AuthDto) {
    let email = authData.email,
      password = authData.password;
    const findUser = await this.userModel.findOne({ email: email });
    if (!findUser) throw new UnauthorizedException('User not found!');
    const isValid = await bcrypt.compare(password, findUser.password);
    if (!isValid) throw new UnauthorizedException('User not found!');
    let isAdmin = findUser.isAdmin,
      id = findUser._id,
      role = findUser.role;
    const payload = { id, role, isAdmin };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
