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
    const workspaceExists = this.workspaceModel.findOne({
      _id: userData.workspace_id,
    });
    if (!workspaceExists) {
      throw new NotFoundException("Workspace doesn't exists!");
    }
    const userExists = await this.userModel.findOne({ email: userData.email });
    if (userExists) {
      if (userExists.workspace_id.find((id) => id == userData.workspace_id)) {
        throw new ConflictException(
          'User with this id already exists in this workspace!',
        );
      } else {
        console.log('entered in else part ', userData.email);
        const updateUser = await this.userModel
          .findOneAndUpdate(
            { email: userData.email },
            { $push: { workspace_id: userData.workspace_id } },
            { new: true },
          )
          .exec();

        return updateUser;
      }
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({
        password: hash,
        ...userData,
        createdBy: req.userData.userId,
      });
      return await newUser.save();
    }
  }

  async getUsers(page: number) {
    const findUsers = await this.userModel
      .find({})
      .limit(10)
      .skip((page - 1) * 10)
      .exec();

    const totalDocs = await this.workspaceModel.countDocuments().exec();
    return { findUsers: findUsers, totalPages: Math.ceil(totalDocs / 10) };
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
  async getMyUsers(req, page: number) {
    const myUsers = await this.userModel
      .find({
        createdBy: req.userData.userId,
      })
      .limit(10)
      .skip((page - 1) * 10);
    const totalDocs = await this.workspaceModel.countDocuments();
    return { findUsers: myUsers, totalPages: Math.ceil(totalDocs / 10) };
  }
}
