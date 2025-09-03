import {
  Body,
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { messageDataDto } from './dtos/message.dto';
import { MessageService } from './messages.services';
import express from 'express';
import { AuthGuard } from 'src/Auth/auth.guard';
import { RolesGuard } from 'src/Auth/roles.guard';
import { Roles } from 'src/Auth/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller()
export class MessageController {
  constructor(private messageService: MessageService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  @Roles('Editor')
  createMessage(
    @Req() request: express.Request,
    @Body() messageData: messageDataDto,
  ) {
    return this.messageService.createMessage(request, messageData);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles('Viewer')
  getMessages(@Req() request: express.Request) {
    return this.messageService.getMessages(request);
  }

  @Get(':id')
  @Roles('Viewer')
  getSingleMessage(@Param('id') id: String) {
    return this.getSingleMessage(id);
  }

  @Patch(':id')
  @Roles('Editor')
  updateMessage(@Param('id') id: String, @Body() messageData: messageDataDto) {
    return this.messageService.updateMessage(id, messageData);
  }

  @Delete(':id')
  @Roles('Editor')
  deleteMessage(@Param('id') id: String) {
    return this.messageService.deleteMessage(id);
  }
}
