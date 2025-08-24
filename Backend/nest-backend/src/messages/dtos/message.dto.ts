import { IsEnum, IsNotEmpty, IsString } from "class-validator";

enum messageType{
    "Text"="text",
    "Text-Image"="text-image"
}

type message={
    text:String,
    imageUrl:String
}

export class messageDataDto{
    @IsNotEmpty()
    @IsString()
    name:String

    @IsNotEmpty()
    @IsEnum(messageType)
    type:messageType
    
    @IsNotEmpty()
    message:message

}