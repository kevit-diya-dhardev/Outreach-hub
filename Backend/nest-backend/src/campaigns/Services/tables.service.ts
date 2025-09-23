import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CampaignPerContacts } from '../campaign-schema/campaignPerContact.schema';
import { Model } from 'mongoose';
import { Campaign } from '../campaign-schema/campaigns.schema';
import { Contacts } from 'src/contacts/contacts.schema';
import { count } from 'console';

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
    @InjectModel(Contacts.name) private contactModel: Model<Contacts>,
  ) {}

  async getRecentCampaigns(workspace_id: string) {
    const recentCampaign = await this.campaignModel
      .find(
        {
          workspace_id: workspace_id,
        },
        { name: 1, selectedTags: 1 },
      )
      .sort({ launchedAt: -1 })
      .limit(5);
    return recentCampaign;
  }

  async getTopTags(workspace_id: string) {
    const topTags = await this.contactModel
      .aggregate([
        { $unwind: { path: '$tags', preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: '$tags',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            tags: '$_id',
            count: '$count',
            _id: 0,
          },
        },
        {
          $limit: 5,
        },
      ])
      .exec();
    return topTags;
  }
}
