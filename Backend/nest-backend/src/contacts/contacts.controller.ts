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
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsDto } from './dto/contacts.dto';
import { AuthGuard } from 'src/Auth/auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  createContact(@Body() contactData: ContactsDto) {
    return this.contactService.createContact(contactData);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  getSingleContact(@Param('id') id: String) {
    return this.contactService.getSingleContact(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  getContacts() {
    return this.contactService.getContacts();
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  updateContact(@Param('id') id: String, @Body() contactData: ContactsDto) {
    return this.contactService.updateContact(id, contactData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  deleteContact(@Param('id') id: String) {
    return this.contactService.deleteContact(id);
  }
}
