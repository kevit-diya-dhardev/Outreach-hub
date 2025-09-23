import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  constructor(private http: HttpClient) {}
  url: string = 'http://localhost:3000/campaigns/tables';
  getRecentCampaigns(workspace_id: string) {
    return this.http.get(`${this.url}/recent-campaigns/${workspace_id}`);
  }

  getTopTags(workspace_id: string) {
    return this.http.get(`${this.url}/top-tags/${workspace_id}`);
  }
}
