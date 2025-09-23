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
import { CampaignsService } from './Services/campaigns.service';
import { AuthGuard } from 'src/Auth/auth.guard';
import { Roles } from 'src/Auth/Roles/roles.decorator';
import { CampaignDto, updateCampaignDto } from './dtos/campaigns.dto';
import { UserRoleGuard } from 'src/Auth/Roles/userRole.guard';
import { ChartService } from './Services/charts.services';
import { start } from 'repl';
import { TablesService } from './Services/tables.service';
@UseGuards(AuthGuard, UserRoleGuard)
@Controller('campaigns')
export class CampaignsController {
  constructor(
    private campaignService: CampaignsService,
    private chartService: ChartService,
    private tablesService: TablesService,
  ) {}

  @Get(':workspace_id')
  @Roles('Viewer', 'Editor')
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
  @Roles('Viewer', 'Editor')
  async getSingleCampaign(@Param('campaignId') campaignId: string) {
    return await this.campaignService.getSingleCampaign(campaignId);
  }

  @Post('/launch-campaign')
  @Roles('Editor')
  async launchCampaign(@Body('campaignId') campaignId: string) {
    console.log('controller', campaignId);
    return await this.campaignService.launchCampaign(campaignId);
  }

  @Get('/launch-campaign/:campaignId')
  @Roles('Viewer', 'Editor')
  async launchCampaignDetails(@Param('campaignId') campaignId: string) {
    console.log('Inside launched campaign....', campaignId);
    return await this.campaignService.getLaunchCampaign(campaignId);
  }

  @Get('charts/campaigns-done/:workspace_id')
  @Roles('Viewer', 'Editor')
  async getChartsCampaigns(
    @Param('workspace_id') workspace_id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.chartService.getChartsCampaignsDone(
      workspace_id,
      startDate,
      endDate,
    );
  }

  @Get('charts/messagesPerType/:workspace_id')
  @Roles('Viewer', 'Editor')
  async getMessagesPerType(
    @Param('workspace_id') workspace_id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('messageType') messageType: string,
  ) {
    return this.chartService.getMessagesPerType(
      workspace_id,
      startDate,
      endDate,
      messageType,
    );
  }
  @Get('charts/contacts-reached/:workspace_id')
  @Roles('Viewer', 'Editor')
  async getContactsReached(
    @Param('workspace_id') workspace_id: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.chartService.getContactsReached(
      workspace_id,
      startDate,
      endDate,
    );
  }
  @Get('tables/recent-campaigns/:workspace_id')
  @Roles('Viewer', 'Editor')
  async getRecentCampaigns(@Param('workspace_id') workspace_id: string) {
    return await this.tablesService.getRecentCampaigns(workspace_id);
  }
  @Get('tables/top-tags/:workspace_id')
  @Roles('Viewer', 'Editor')
  async getTopTags(@Param('workspace_id') workspace_id: string) {
    return await this.tablesService.getTopTags(workspace_id);
  }
}
