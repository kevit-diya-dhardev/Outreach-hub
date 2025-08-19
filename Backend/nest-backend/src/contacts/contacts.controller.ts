import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsDto } from './dto/contacts.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createContact(@Body() contactData: ContactsDto) {
    return this.contactService.createContact(contactData);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  getSingleContact(@Param('id') id: String) {
    return this.contactService.getSingleContact(id);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  getContacts() {
    return this.contactService.getContacts();
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateContact(@Param('id') id: String, @Body() contactData: ContactsDto) {
    return this.contactService.updateContact(id, contactData);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  deleteContact(@Param('id') id: String) {
    return this.contactService.deleteContact(id);
  }
}
