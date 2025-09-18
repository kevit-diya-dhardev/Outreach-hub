import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CampaignsService } from '../campaigns.service';
import { Campaigns } from '../models/campaigns';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrl: './create-campaign.component.scss',
})
export class CreateCampaignComponent {
  messages: any;
  selectMessage(message: any) {
    this.selectedMessage = message;
    this.isDropdownOpen = false;
  }
  tagInput: string = '';
  isDropdownOpen: boolean = false;
  constructor(
    private fb: FormBuilder,
    private campaigService: CampaignsService
  ) {}
  selectedMessage!: {
    _id?: string;
    name: string;
    type: string;
    message: {
      text: string;
      imageUrl?: string;
    };
  };
  @Output() createFormVisible = new EventEmitter();
  @Input() mode!: string;
  @Input() campaign: any;
  availableTags: any;

  editForm() {
    console.log('Edit form', this.campaign);
    this.campaignForm.patchValue(this.campaign);
    this.selectedMessage = {
      name: this.campaign.message.message_name,
      type: this.campaign.message.type,
      message: {
        text: this.campaign.message.text,
      },
    };
  }

  campaignForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    selectedTags: [[] as string[], [Validators.required]],
    message: {
      message_name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      text: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
    },
  });
  closeForm() {
    this.createFormVisible.emit(false);
  }
  get selectedTags(): string[] {
    return this.campaignForm.get('selectedTags')?.value || [];
  }
  get formControls() {
    return this.campaignForm.controls;
  }
  addTag(tagValue: string) {
    this.tagInput = tagValue;
    if (this.tagInput && !this.selectedTags.includes(this.tagInput)) {
      this.selectedTags.push(this.tagInput.trim());
      this.tagInput = '';
    }
  }
  removeTag(tagToRemove: string): void {
    const currentTags = this.selectedTags!.filter((tag) => tag !== tagToRemove);
    this.campaignForm.get('selectedTags')?.setValue(currentTags);
  }
  ngOnInit() {
    this.campaigService.getMessages().subscribe({
      next: (response: any) => {
        console.log('Inside campaign component ', response.messages);
        this.messages = response.messages;
      },
      error: (error) => {
        console.log(error);
      },
    });
    if (this.mode == 'edit') {
      this.editForm();
    }
  }

  onSubmit() {
    if (this.mode == 'edit') {
      this.submitEditFormData();
    } else {
      this.submitCreateFormData();
    }
  }
  submitEditFormData() {
    console.log('edit form!!!', this.selectedMessage);
    let campaignData: Campaigns = {
      name: this.formControls.name.value!,
      description: this.formControls.description.value!,
      selectedTags: this.formControls.selectedTags.value!,
      message: {
        message_name: this.selectedMessage.name,
        type: this.selectedMessage.type,
        text: this.selectedMessage.message.text,
        imageUrl:
          this.selectedMessage.type == 'Text-Image'
            ? this.selectedMessage.message.imageUrl
            : undefined,
        message_id: this.selectedMessage._id,
      },
    };
    console.log(campaignData);
    this.campaigService
      .updateCampaign(this.campaign._id, campaignData)
      .subscribe({
        next: (response: any) => {
          console.log('Inside campaign edit component ', response);
          this.createFormVisible.emit(false);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  submitCreateFormData() {
    let campaignData: Campaigns = {
      name: this.formControls.name.value!,
      description: this.formControls.description.value!,
      selectedTags: this.formControls.selectedTags.value!,
      message: {
        message_name: this.selectedMessage.name,
        type: this.selectedMessage.type,
        text: this.selectedMessage.message.text,
        imageUrl:
          this.selectedMessage.type == 'Text-Image'
            ? this.selectedMessage.message.imageUrl
            : undefined,
        message_id: this.selectedMessage._id,
      },
    };
    console.log(campaignData);
    this.campaigService.createCampaigns(campaignData).subscribe({
      next: (response: any) => {
        console.log('Inside campaign component ', response);
        this.createFormVisible.emit(false);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
