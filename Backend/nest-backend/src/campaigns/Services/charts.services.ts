import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign, Submessage } from '../campaign-schema/campaigns.schema';
import { Mode } from 'fs';
import { isValidObjectId, Model } from 'mongoose';
import { CampaignPerContacts } from '../campaign-schema/campaignPerContact.schema';
import { CampaignDto, updateCampaignDto } from '../dtos/campaigns.dto';
import { Contacts } from 'src/contacts/contacts.schema';
import { ContactsDto } from 'src/contacts/dto/contacts.dto';

@Injectable()
export class ChartService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
    @InjectModel(CampaignPerContacts.name)
    private campaignPerContactModel: Model<CampaignPerContacts>,
    @InjectModel(Contacts.name)
    private ContactsModel: Model<Contacts>,
  ) {}

  async getChartsCampaignsDone(
    workspace_id: string,
    startDate: string,
    endDate: string,
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const launchedCampaignData = await this.campaignModel
      .aggregate([
        {
          $match: {
            workspace_id: workspace_id,
            // if launchedAt is stored as string, convert it here
          },
        },
        {
          $addFields: {
            launchedAtDate: { $toDate: '$launchedAt' },
          },
        },
        {
          $match: {
            launchedAtDate: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$launchedAtDate' },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            count: 1,
          },
        },
      ])
      .exec();

    console.log(launchedCampaignData);
  }
}
