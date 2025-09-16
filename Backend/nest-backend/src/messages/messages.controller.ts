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
  Query,
} from '@nestjs/common';
import { messageDataDto } from './dtos/message.dto';
import { MessageService } from './messages.services';
import express from 'express';
import { AuthGuard } from 'src/Auth/auth.guard';
import { RolesGuard } from 'src/Auth/roles.guard';
import { Roles } from 'src/Auth/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('messages')
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

  @Get('myMessages/:workspace_id')
  @UseGuards(AuthGuard)
  @Roles('Viewer')
  getMyMessages(
    @Req() request: express.Request,
    @Query('page') page: number,
    @Param('workspace_id') workspace_id: string,
  ) {
    return this.messageService.getMyMessages(request, workspace_id, page);
  }

  @Get('allMessages/:workspace_id')
  @UseGuards(AuthGuard)
  @Roles('Viewer')
  getAllMessages(
    @Req() request: express.Request,
    @Query('page') page: number,
    @Param('workspace_id') workspace_id: string,
  ) {
    return this.messageService.getAllMessages(workspace_id, page);
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
