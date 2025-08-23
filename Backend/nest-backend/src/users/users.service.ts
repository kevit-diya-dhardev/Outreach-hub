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

  async createUser({ password, ...userData }: userDto) {
    const findUser = await this.userModel.findOne({
      $and: [
        { email: userData.email },
        { workspace_id: userData.workspace_id },
      ],
    });
    if (findUser)
      throw new ConflictException('User already exists in this workspace!');
    const findWorkspace = await this.workspaceModel.findOne({
      workspace_id: userData.workspace_id,
    });
    if (!findWorkspace)
      throw new NotFoundException("Workspace does'nt exists!");

    try {
      const hash = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({ password: hash, ...userData });
      return newUser.save();
    } catch (err) {
      console.log(err);
      throw new HttpException('Internal server errro!', 501);
    }
  }

  async getUsers() {
    const findUsers = await this.userModel.find({});
    return findUsers;
  }

  async getSingleUser(id: String) {
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
}
