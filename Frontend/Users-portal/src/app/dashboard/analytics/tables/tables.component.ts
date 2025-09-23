import { Component } from '@angular/core';
import { TablesService } from './tables-service.service';

export interface Campaign {
  name: string;
  selectedTags: string[];
}

export interface Tags {
  tags: string;
  count: number;
}
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss',
})
export class TablesComponent {
  topTags!: Tags[];
  recentCampaigns!: Campaign[];
  workspace_id: string = localStorage.getItem('workspace_id')!;
  constructor(private tablesService: TablesService) {}

  ngOnInit() {
    this.tablesService.getRecentCampaigns(this.workspace_id).subscribe({
      next: (response: any) => {
        this.recentCampaigns = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.tablesService.getTopTags(this.workspace_id).subscribe({
      next: (response: any) => {
        this.topTags = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
