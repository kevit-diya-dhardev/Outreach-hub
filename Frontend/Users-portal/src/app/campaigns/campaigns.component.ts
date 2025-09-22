import { Component } from '@angular/core';
import { Campaigns } from './models/campaigns';
import { CampaignsService } from './campaigns.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss',
})
export class CampaignsComponent {
  constructor(
    private campaignService: CampaignsService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}
  createFormVisible = false;
  role = localStorage.getItem('role');
  campaigns!: any;
  mode = '';
  campaignData!: Campaigns;
  viewCampaignData!: Campaigns;
  viewFormVisible: boolean = false;
  copiedCampaign!: Campaigns;
  isLoading: boolean = false;
  async recieveCreateFormData(createFormVisible: boolean) {
    this.createFormVisible = createFormVisible;
    await this.getCampaigns();
  }
  allowFormVisibility() {
    this.createFormVisible = true;
    this.mode = 'create';
  }
  openViewCampaign(campaign: Campaigns) {
    this.viewCampaignData = campaign;
    this.viewFormVisible = true;
  }
  ngOnInit() {
    this.getCampaigns();
  }
  recieveViewCampaignData(viewFormVisible: boolean) {
    this.viewFormVisible = viewFormVisible;
  }
  editForm(campaign: Campaigns) {
    this.campaignData = campaign;
    this.createFormVisible = true;
    this.mode = 'edit';
  }
  getCampaigns() {
    this.campaignService.getCampaigns().subscribe({
      next: (response: any) => {
        console.log(response.campaigns);
        this.campaigns = response.campaigns;
      },
      error: (error) => {
        console.log(error);
        if (error.error.message == 'Unauthorized') {
          this.router.navigate(['/login']);
        }
      },
    });
  }

  deleteCampaign(campaign: Campaigns) {
    this.campaignService.deleteCampaign(campaign._id!).subscribe({
      next: (response) => {
        console.log(response);
        this.snackbarService.show('Campaign deleted successfully', 'success');
        this.getCampaigns();
      },
      error: (error) => {
        console.error(error);
        this.snackbarService.show(error.error.message, 'error');
        alert(error.error.message);
      },
    });
  }
  copyCampaign(campaign: Campaigns) {
    this.copiedCampaign = campaign;
    this.snackbarService.show('Campaign copied', 'success');
  }

  showLoadingScreen(campaign: Campaigns) {
    console.log(campaign._id!);
    this.isLoading = true;
    setTimeout(() => {
      this.launchCampaign(campaign);
    }, 3000);
  }
  launchCampaign(campaign: Campaigns) {
    this.isLoading = false;
    this.campaignService.launchCampaign(campaign._id!).subscribe({
      next: (response) => {
        console.log(response);
        this.snackbarService.show('Campaign launched successfully', 'success');
        this.navigateToDetails(campaign);
      },
      error: (error) => {
        console.log(error);
        this.snackbarService.show(error.error.message, 'error');
        alert(error.error.message);
      },
    });
  }
  navigateToDetails(campaign: Campaigns) {
    this.router.navigate([`/campaigns/${campaign._id}`]);
  }
}
