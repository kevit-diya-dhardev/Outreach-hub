import { Body, Controller,Get,Patch,Delete, Post, Req, UseGuards, UsePipes, ValidationPipe, Param } from "@nestjs/common";
import { messageDataDto } from "./dtos/message.dto";
import { MessageService } from "./messages.services";
import express from "express";
import { AuthGuard } from "src/Auth/auth.guard";

@Controller()
export class MessageController {
    constructor(private messageService:MessageService){}
    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    createMessage(@Req() request:express.Request, @Body() messageData:messageDataDto){
        return this.messageService.createMessage(request,messageData);
    }

    @Get()
    @UseGuards(AuthGuard)
    getMessages(@Req() request:express.Request){
        return this.messageService.getMessages(request)
    }

    @Get(":id")
    @UseGuards(AuthGuard)
    getSingleMessage(@Param("id") id :String){
        return this.getSingleMessage(id)
    }

    @Patch(":id")
    @UseGuards(AuthGuard)
    updateMessage(@Param("id")id:String,@Body()messageData:messageDataDto){
        return this.messageService.updateMessage(id,messageData);
    }

    @Delete(":id")
     @UseGuards(AuthGuard)
    deleteMessage(@Param("id")id:String){
        return this.messageService.deleteMessage(id);
    }
}
