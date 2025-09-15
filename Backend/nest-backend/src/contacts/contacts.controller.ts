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
  Req,
  Query,
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
  createContact(@Body() contactData: ContactsDto, @Req() req: any) {
    return this.contactService.createContact(contactData, req);
  }

  @Get(':workspace_id')
  @Roles('Viewer')
  getContacts(
    @Param('workspace_id') workspace_id: string,
    @Query('page') page: number,
  ) {
    return this.contactService.getContacts(page, workspace_id);
  }

  @Get(':contact_id')
  @Roles('Viewer')
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
