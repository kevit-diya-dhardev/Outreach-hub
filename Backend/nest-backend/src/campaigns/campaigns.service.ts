import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Campaign, Submessage } from './campaign-schema/campaigns.schema';
import { Mode } from 'fs';
import { isValidObjectId, Model } from 'mongoose';
import { CampaignPerContacts } from './campaign-schema/campaignPerContact.schema';
import { CampaignDto, updateCampaignDto } from './dtos/campaigns.dto';
import { Contacts } from 'src/contacts/contacts.schema';
import { ContactsDto } from 'src/contacts/dto/contacts.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<Campaign>,
    @InjectModel(CampaignPerContacts.name)
    private campaignPerContactModel: Model<CampaignPerContacts>,
    @InjectModel(Contacts.name)
    private ContactsModel: Model<Contacts>,
  ) {}

  async getCampaigns(page: number, workspace_id: string) {
    const campaigns = await this.campaignModel
      .find({ workspace_id: workspace_id })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();

    if (campaigns.length < 1) {
      throw new NotFoundException("Campaigns doesn't exist!!");
    }

    const totalDocs = await this.campaignModel.countDocuments().exec();
    return { campaigns: campaigns, totalPages: Math.ceil(totalDocs / 10) };
  }
  async createCampaign({ ...campaignData }: CampaignDto, reqData) {
    const campaign = new this.campaignModel({
      ...campaignData,
      createdBy: reqData.userData.userId,
    });
    try {
      const savedCampaign = await campaign.save();
      return savedCampaign;
    } catch (error) {
      console.log(error);
      throw new HttpException('Server error in creating message!', 500);
    }
  }

  async deleteCampaign(campaignId: string) {
    if (!isValidObjectId(campaignId))
      throw new NotFoundException("Campaign doesn't exists!");
    const campaign = await this.campaignModel.findOne({ _id: campaignId });
    if (campaign && campaign?.status != 'Draft') {
      throw new HttpException(
        'Campaign delete is allowed only in case when its not launched!!',
        400,
      );
    }
    return await this.campaignModel.deleteOne({ _id: campaignId });
  }

  async updateCampaign(campaignId: string, campaignData: updateCampaignDto) {
    if (!isValidObjectId(campaignId))
      throw new NotFoundException("Campaign doesn't exists!");
    const campaign = await this.campaignModel.findOne({ _id: campaignId });
    if (campaign && campaign?.status != 'Draft') {
      throw new HttpException(
        'Campaign edit is allowed only in case when its not launched!!',
        400,
      );
    }
    const updateCampaign = await this.campaignModel.findByIdAndUpdate(
      campaignId,
      campaignData,
      { new: true },
    );
    return updateCampaign;
  }

  async getSingleCampaign(campaignId: string) {
    if (!isValidObjectId(campaignId))
      throw new NotFoundException("Campaign doesn't exists!");
    return await this.campaignModel.findOne({ _id: campaignId });
  }

  async launchCampaign(campaignId: string) {
    const campaign = await this.campaignModel.findOne({
      _id: campaignId,
    })!;
    if (!campaign || campaign?.status != 'Draft') {
      throw new HttpException(
        'Only campaigns in draft state can be launched!!',
        400,
      );
    }

    const contacts: any = await this.ContactsModel.find({
      tags: { $all: campaign.selectedTags },
    });
    console.log(contacts);

    if (contacts.length < 1) {
      throw new HttpException(
        'No targetted contacts exists with these given tags!',
        400,
      );
    }
    const updateCampaign = await this.campaignModel.findByIdAndUpdate(
      campaignId,
      { launchedAt: Date.now() },
      { new: true },
    );
    let messagePerContact!: any,
      id: number = 0;
    for (let contact of contacts) {
      messagePerContact.push({
        type: campaign.message.type,
        text: campaign.message.text,
        imageUrl:
          campaign.message.type === 'Text-Image'
            ? campaign.message.imageUrl
            : undefined,
        contact_id: contact._id,
        contact_name: contact.contact_name,
        phoneNumber: contact.phoneNumber,
      });
    }
    try {
      const campaignLaunched = await this.campaignPerContactModel.create({
        messagePerContact: messagePerContact,
        workspace_id: campaign.workspace_id,
        campaignId: campaign._id,
        tags: campaign.selectedTags,
      });

      return campaignLaunched;
    } catch (error) {
      console.log(error);
      throw new HttpException('Server error in launching a campaign!', 500);
    }
  }
}
