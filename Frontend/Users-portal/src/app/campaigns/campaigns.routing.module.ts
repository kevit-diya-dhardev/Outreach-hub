import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsComponent } from './campaigns.component';
import { LaunchCampaignComponent } from './launch-campaign/launch-campaign.component';

const routes: Routes = [
  { path: '', component: CampaignsComponent },
  { path: ':campaignId', component: LaunchCampaignComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignsRoutingModule {}
