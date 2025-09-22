import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './Services/campaigns.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign, CampaignSchema } from './campaign-schema/campaigns.schema';
import {
  CampaignPerContacts,
  CampaignPerContactsSchema,
} from './campaign-schema/campaignPerContact.schema';
import { AuthModule } from 'src/Auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { Auth, AuthSchema } from 'src/Auth/auth.schema';
import { Contacts, ContactSchema } from 'src/contacts/contacts.schema';
import { ChartService } from './Services/charts.services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
      { name: CampaignPerContacts.name, schema: CampaignPerContactsSchema },
      { name: Auth.name, schema: AuthSchema },
      { name: Contacts.name, schema: ContactSchema },
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService, ChartService],
})
export class CampaignsModule {}
