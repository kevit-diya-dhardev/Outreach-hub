import {
  HttpException,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './messages.schema';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { messageDataDto } from './dtos/message.dto';
import express from 'express';
import { NotFoundError } from 'rxjs';
import { Workspace } from 'src/workspace/workspace.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Workspace.name) private workspaceModel: Model<Workspace>,
  ) {}

  async createMessage(reqData, messageData: messageDataDto) {
    const newMessage = new this.messageModel({
      name: messageData.name,
      type: messageData.type,
      message: messageData.message,
      workspace_id: messageData.workspace_id,
      createdBy: reqData.userData.userId,
    });
    const savedMessage = await newMessage.save();
    if (!savedMessage)
      throw new HttpException('Server error in creating message!', 500);
    return savedMessage;
  }

  async getAllMessages(id: string, page?: number) {
    let messages: any;
    if (page) {
      messages = await this.messageModel
        .find({
          workspace_id: id,
        })
        .limit(10)
        .skip((page - 1) * 10)
        .exec();
    } else {
      console.log('Enetrhxcbvnxb');
      messages = await this.messageModel.find({ workspace_id: id });
    }
    const totalDocs = await this.messageModel
      .countDocuments({ workspace_id: id })
      .exec();

    return { messages: messages, totalPages: Math.ceil(totalDocs / 10) };
  }

  async getMyMessages(reqData, id: string, page: number) {
    console.log(page);
    const messages = await this.messageModel
      .find({
        createdBy: reqData.userData.userId,
        workspace_id: id,
      })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();

    const totalDocs = await this.messageModel
      .countDocuments({ workspace_id: id })
      .exec();
    console.log('TotalDocs ', totalDocs);

    return { messages: messages, totalPages: Math.ceil(totalDocs / 10) };
  }

  async getSingleMessage(id: String) {
    if (!isValidObjectId(id))
      throw new NotFoundException("Contact does't exists!!");
    const messages = await this.messageModel.find({ _id: id });
    if (!messages)
      throw new NotFoundException('No messages exists with this id!');
    return messages;
  }

  async deleteMessage(id: String) {
    console.log('Entered');
    if (!isValidObjectId(id))
      throw new NotFoundException("Contact does't exists!!");
    return await this.messageModel.deleteOne({ _id: id });
  }

  async updateMessage(id: String, messageData: messageDataDto) {
    if (!isValidObjectId(id))
      throw new NotFoundException("Message does't exists!!");
    const updatedMessage = await this.messageModel.findByIdAndUpdate(
      id,
      messageData,
      { new: true },
    );
    return updatedMessage;
  }
}
