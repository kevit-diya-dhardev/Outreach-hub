import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { Workspace } from 'src/workspace/workspace.schema';
import { updateUserDto, userDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Workspace.name) private workspaceModel: Model<Workspace>,
  ) {}

  async createUser({ password, ...userData }: userDto, req: any) {
    try {
      const hash = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({
        password: hash,
        ...userData,
        createdBy: req.userData.userId,
      });
      return await newUser.save();
    } catch (err) {
      if (err.code === 11000) {
        throw new ConflictException(
          'User with this email already exists in this workspace',
        );
      }
      console.log(err);
      throw new HttpException('Internal server errro!', 501);
    }
  }

  async getUsers() {
    const findUsers = await this.userModel.find({});
    return findUsers;
  }

  async getSingleUser(id: String) {
    console.log('Inside user service method');
    const findUser = await this.userModel.findById(id);
    if (!findUser) throw new NotFoundException('User not found!');
    return findUser;
  }

  async updateUser(id: String, { password, ...userData }: updateUserDto) {
    console.log(userData);
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      await this.userModel.findByIdAndUpdate(id, { password: hash });
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...userData },
      { new: true },
    );
    if (!updatedUser) throw new NotFoundException('User not found!');
    return updatedUser;
  }

  async deleteUser(id: String) {
    const deletedUser = await this.userModel.findOneAndDelete({ _id: id });
    if (!deletedUser) throw new NotFoundException('User not found!');
    return deletedUser;
  }
  async getMyUsers(req) {
    const myUsers = await this.userModel.find({
      createdBy: req.userData.userId,
    });
    return myUsers;
  }
}
