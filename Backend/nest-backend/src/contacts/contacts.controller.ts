import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsDto } from './dto/contacts.dto';
import { AuthGuard } from 'src/Auth/auth.guard';

import { Roles } from 'src/Auth/Roles/roles.decorator';
import { UserRoleGuard } from 'src/Auth/Roles/userRole.guard';
@UseGuards(AuthGuard, UserRoleGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private contactService: ContactsService) {}

  @Post()
  @Roles('Editor')
  createContact(@Body() contactData: ContactsDto, @Req() req: any) {
    return this.contactService.createContact(contactData, req);
  }

  @Get(':workspace_id')
  @Roles('Viewer', 'Editor')
  getContacts(
    @Param('workspace_id') workspace_id: string,
    @Query('page') page: number,
  ) {
    return this.contactService.getContacts(page, workspace_id);
  }

  @Get(':contact_id')
  @Roles('Viewer', 'Editor')
  getSingleContact(@Param('userid') contact_id: String) {
    return this.contactService.getSingleContact(contact_id);
  }

  @Patch(':id')
  @Roles('Editor')
  updateContact(@Param('id') id: String, @Body() contactData: ContactsDto) {
    return this.contactService.updateContact(id, contactData);
  }

  @Delete(':id')
  @Roles('Editor')
  deleteContact(@Param('id') id: String) {
    return this.contactService.deleteContact(id);
  }
}
