import {
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import * as bcrypt from 'bcrypt';
import { AuthDto } from '../dto/auth.dto';
import { Auth } from '../auth.schema';

//Service that generates token

export class AdminAuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
  ) {}

  async generateToken(authData: AuthDto) {
    console.log('Inside auth service');
    let email = authData.email,
      password = authData.password;

    const findUser = await this.userModel.findOne({ email: email });
    if (!findUser) throw new UnauthorizedException('User not found!!');

    const isValid = await bcrypt.compare(password, findUser.password);
    if (!isValid) throw new UnauthorizedException('User not found!!!!');

    let role = findUser.isAdmin;
    if (!role) {
      throw new HttpException('Forbidden access!', 400);
    }

    let userId = findUser._id;

    const payload = { userId };
    const token = await this.jwtService.signAsync(payload);

    try {
      await this.storeToken(token);
    } catch (error) {
      console.log('Storing token error' + error);
      throw new HttpException('Store token error', 500);
    }
    return { token: token };
  }

  async storeToken(token) {
    const newToken = new this.authModel({ token });
    return await newToken.save();
  }

  async deleteTokenFromDb(token) {
    return await this.authModel.deleteOne({ token });
  }
}
