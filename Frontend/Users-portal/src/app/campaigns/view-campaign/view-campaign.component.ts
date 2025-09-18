import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view-campaign',
  templateUrl: './view-campaign.component.html',
  styleUrl: './view-campaign.component.scss',
})
export class ViewCampaignComponent {
  @Input() campaignData: any;
  @Output() viewFormVisible = new EventEmitter();
  closeViewForm() {
    this.viewFormVisible.emit(false);
  }
  ngOnInit() {
    console.log(this.campaignData);
  }
}
