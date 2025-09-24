import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from '../messages/messages.service';
import { Campaigns } from './models/campaigns';

@Injectable({
  providedIn: 'root',
})
export class CampaignsService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  url: string = 'http://localhost:3000/campaigns';

  createCampaigns({ ...CampaignsData }: Campaigns) {
    let finalData = {
      ...CampaignsData,
    };
    return this.http.post(`${this.url}`, finalData);
  }

  getCampaigns(workspace_id: string, page: number) {
    return this.http.get(`${this.url}/${workspace_id}?page=${page}`);
  }

  deleteCampaign(campaignId: string) {
    return this.http.delete(`${this.url}/${campaignId}`);
  }

  updateCampaign(campaignId: string, campaignData: Campaigns) {
    return this.http.patch(`${this.url}/${campaignId}`, campaignData);
  }

  getSingleCampaign(campaignId: string) {
    return this.http.get(`${this.url}/single-campaigns/${campaignId}`);
  }

  launchCampaign(campaignId: string) {
    return this.http.post(`${this.url}/launch-campaign`, {
      campaignId: campaignId,
    });
  }

  getMessages(workspace_id: string) {
    return this.messageService.getAllMessages(workspace_id);
  }

  getLaunchedCampaign(campaignId: string) {
    return this.http.get(`${this.url}/launch-campaign/${campaignId}`);
  }
}
