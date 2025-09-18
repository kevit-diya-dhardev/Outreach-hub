import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { AuthGuard } from 'src/Auth/auth.guard';
import { RolesGuard } from 'src/Auth/roles.guard';
import { Roles } from 'src/Auth/roles.decorator';
import { CampaignDto, updateCampaignDto } from './dtos/campaigns.dto';
@UseGuards(AuthGuard, RolesGuard)
@Controller('campaigns')
export class CampaignsController {
  constructor(private campaignService: CampaignsService) {}

  @Get(':workspace_id')
  @Roles('Viewer')
  async getCampaigns(
    @Param('workspace_id') workspace_id: string,
    @Query('page') page: number,
  ) {
    return await this.campaignService.getCampaigns(page, workspace_id);
  }

  @Post('')
  @Roles('Editor')
  async createCampaigns(@Body() campaignData: CampaignDto, @Req() req: any) {
    return await this.campaignService.createCampaign(campaignData, req);
  }

  @Delete(':campaignId')
  @Roles('Editor')
  async deleteCampaign(@Param('campaignId') campaignId: string) {
    return await this.campaignService.deleteCampaign(campaignId);
  }

  @Patch(':campaignId')
  @Roles('Editor')
  async updateCampaign(
    @Param('campaignId') campaignId: string,
    @Body() campaignData: updateCampaignDto,
  ) {
    return await this.campaignService.updateCampaign(campaignId, campaignData);
  }

  @Get('single-campaigns/:campaignId')
  @Roles('Viewer')
  async getSingleCampaign(@Param('campaignId') campaignId: string) {
    return await this.campaignService.getSingleCampaign(campaignId);
  }

  @Post('/launch-campaign')
  @Roles('Editor')
  async launchCampaign(@Body('campaignId') campaignId: string) {
    console.log('controller', campaignId);
    return await this.campaignService.launchCampaign(campaignId);
  }
}
