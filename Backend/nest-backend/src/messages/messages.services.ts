import {
  HttpException,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './messages.schema';
import { isValidObjectId, Model } from 'mongoose';
import { messageDataDto } from './dtos/message.dto';
import express from 'express';
import { NotFoundError } from 'rxjs';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async createMessage(reqData, messageData: messageDataDto) {
    const newMessage = new this.messageModel({
      name: messageData.name,
      type: messageData.type,
      message: messageData.message,
      workspace_id: reqData.userData.workspace_id,
      createdBy: reqData.userData.userId,
    });
    const savedMessage = await newMessage.save();
    if (!savedMessage)
      throw new HttpException('Server error in creating message!', 500);
    return savedMessage;
  }
  async getMessages(reqData, page: number) {
    const messages = await this.messageModel
      .find({
        createdBy: reqData.userData.userId,
      })
      .limit(10)
      .skip(page * 10);

    if (messages.length < 1) throw new NotFoundException('No messages exists!');
    const totalDocs = await this.messageModel.countDocuments();

    return { messages: messages, totalPages: totalDocs };
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
