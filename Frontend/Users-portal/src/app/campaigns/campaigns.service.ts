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
  workspace_id: string = localStorage.getItem('workspace_id')!;
  createCampaigns({ ...CampaignsData }: Campaigns) {
    let finalData = {
      ...CampaignsData,
      workspace_id: this.workspace_id,
    };
    return this.http.post(`${this.url}`, finalData);
  }

  getCampaigns() {
    return this.http.get(`${this.url}/${this.workspace_id}`);
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

  getMessages() {
    return this.messageService.getAllMessages(this.workspace_id);
  }
}
