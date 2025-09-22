import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/campaigns/charts';
  getUpdatedCampaignsData(
    workspace_id: string,
    startDate: string,
    endDate: string
  ) {
    return this.http.get(
      `${this.url}/campaigns-done/${workspace_id}?startDate=${startDate}&endDate=${endDate}`
    );
  }
}
