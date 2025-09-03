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
import { RolesGuard } from 'src/Auth/roles.guard';
import { Roles } from 'src/Auth/roles.decorator';
@UseGuards(AuthGuard, RolesGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  @Post()
  @Roles('Editor')
  @UsePipes(new ValidationPipe())
  createContact(@Body() contactData: ContactsDto) {
    return this.contactService.createContact(contactData);
  }

  @Get(':id')
  @Roles('Viewer')
  @UsePipes(new ValidationPipe())
  getSingleContact(@Param('id') id: String) {
    return this.contactService.getSingleContact(id);
  }

  @Get()
  @Roles('Viewer')
  @UsePipes(new ValidationPipe())
  getContacts() {
    return this.contactService.getContacts();
  }

  @Patch(':id')
  @Roles('Editor')
  @UsePipes(new ValidationPipe())
  updateContact(@Param('id') id: String, @Body() contactData: ContactsDto) {
    return this.contactService.updateContact(id, contactData);
  }

  @Delete(':id')
  @Roles('Editor')
  @UsePipes(new ValidationPipe())
  deleteContact(@Param('id') id: String) {
    return this.contactService.deleteContact(id);
  }
}
