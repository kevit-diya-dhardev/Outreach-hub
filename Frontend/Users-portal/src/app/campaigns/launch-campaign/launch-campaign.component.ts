import { Component, Input } from '@angular/core';
import { Campaigns } from '../models/campaigns';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaignPerContact } from '../models/campaignPerContact';
import { CampaignsService } from '../campaigns.service';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'app-launch-campaign',
  templateUrl: './launch-campaign.component.html',
  styleUrl: './launch-campaign.component.scss',
})
export class LaunchCampaignComponent {
  campaignPerContact!: CampaignPerContact;
  campaign!: Campaigns;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private campaignService: CampaignsService,
    private snackbarService:SnackbarService
  ) {}
  campaignId!: string;
  ngOnInit() {
    this.campaignId = this.router.snapshot.paramMap.get('campaignId')!;
    this.getLaunchedCampaign();
  }

  getLaunchedCampaign() {
    this.campaignService.getLaunchedCampaign(this.campaignId).subscribe({
      next: (response: any) => {
        console.log(response);
         
        this.campaignPerContact = response;
      },
      error: (error) => {
        console.error(error);
         
      },
    });
  }
  navigateToCampaigns() {
    this.route.navigate(['/campaigns']);
  }
}
