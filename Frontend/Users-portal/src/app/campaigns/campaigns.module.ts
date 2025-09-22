import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsComponent } from './campaigns.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CampaignsRoutingModule } from './campaigns.routing.module';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';

import { ViewCampaignComponent } from './view-campaign/view-campaign.component';
import { CampaignsService } from './campaigns.service';
import { LaunchCampaignComponent } from './launch-campaign/launch-campaign.component';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [
    CampaignsComponent,
    CreateCampaignComponent,
    LaunchCampaignComponent,
    ViewCampaignComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CampaignsRoutingModule,
    FormsModule,
    DashboardModule,
  ],
  providers: [CampaignsService],
})
export class CampaignsModule {}
