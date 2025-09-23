import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign, Submessage } from '../campaign-schema/campaigns.schema';
import { Mode } from 'fs';
import { isValidObjectId, Model, Types } from 'mongoose';
import { CampaignPerContacts } from '../campaign-schema/campaignPerContact.schema';
import { CampaignDto, updateCampaignDto } from '../dtos/campaigns.dto';
import { Contacts } from 'src/contacts/contacts.schema';
import { ContactsDto } from 'src/contacts/dto/contacts.dto';
import { endWith } from 'rxjs';
import { count } from 'console';
import { start } from 'repl';
import { format } from 'path';

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
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const launchedCampaignData = await this.campaignModel
      .aggregate([
        {
          $match: {
            workspace_id: new Types.ObjectId(workspace_id),
            launchedAt: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$launchedAt' } },
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
        { $sort: { date: 1 } },
      ])
      .exec();

    return launchedCampaignData;
  }

  async getMessagesPerType(
    workspace_id: string,
    startDate: string,
    endDate: string,
    messageType: string,
  ) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 59);

    const messagePerType = await this.campaignPerContactModel
      .aggregate([
        {
          $match: {
            workspace_id: new Types.ObjectId(workspace_id),
            sentAt: { $gte: start, $lte: end },
            'messagePerContact.type': messageType,
          },
        },
        {
          $project: {
            sentAt: 1,
            messageCount: { $size: '$messagePerContact' },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$sentAt' } },
            count: { $sum: '$messageCount' },
          },
        },
        {
          $project: {
            date: '$_id',
            count: 1,
            _id: 0,
          },
        },
        { $sort: { date: 1 } },
      ])
      .exec();

    return messagePerType;
  }

  async getContactsReached(
    workspace_id: string,
    startDate: string,
    endDate: string,
  ) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 59);

    const contactsReached = await this.campaignPerContactModel
      .aggregate([
        {
          $match: {
            workspace_id: new Types.ObjectId(workspace_id),
            sentAt: { $gte: start, $lte: end },
          },
        },
        {
          $project: {
            sentAt: 1,
            messageCount: { $size: '$messagePerContact' },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$sentAt' } },
            count: { $sum: '$messageCount' },
          },
        },
        {
          $project: {
            date: '$_id',
            count: 1,
            _id: 0,
          },
        },
        { $sort: { date: 1 } },
      ])
      .exec();
    return contactsReached;
  }
}
