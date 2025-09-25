import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CampaignsService } from '../campaigns.service';
import { Campaigns } from '../models/campaigns';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrl: './create-campaign.component.scss',
})
export class CreateCampaignComponent {
  messages: any;
  workspace_id: string = localStorage.getItem('workspace_id')!;
  selectMessage(message: any) {
    this.selectedMessage = message;
    this.isDropdownOpen = false;
  }
  tagInput: string = '';
  isDropdownOpen: boolean = false;
  constructor(
    private fb: FormBuilder,
    private campaigService: CampaignsService,
    private snackbarService: SnackbarService
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
  @Input() iscopiedCampaign!: boolean;
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
    message_name: [null],
    type: [null],
    text: [null],
    imageUrl: [null],
  });
  closeForm() {
    this.createFormVisible.emit(false);
  }

  get formControls() {
    return this.campaignForm.controls;
  }
  addTag(tagValue: string) {
    const tags = this.campaignForm.get('selectedTags')?.value ?? [];
    if (tagValue && !tags.includes(tagValue)) {
      this.campaignForm
        .get('selectedTags')
        ?.setValue([...tags, tagValue.trim()]);
      this.tagInput = '';
    }
  }

  removeTag(tagToRemove: string): void {
    const control = this.campaignForm.get('selectedTags');
    const tags = control?.value ?? [];
    const current = control?.value ?? [];
    const updated = current.filter((tag: string) => tag !== tagToRemove);
    control?.setValue(updated);
    control?.markAsDirty();
    control?.markAsTouched();
  }

  ngOnInit() {
    this.campaigService.getMessages(this.workspace_id).subscribe({
      next: (response: any) => {
        this.messages = response.messages;
      },
      error: (error) => {
        console.log(error);
        alert(error.error.message);
      },
    });
    if (this.mode == 'edit' || this.iscopiedCampaign) {
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
      workspace_id: this.workspace_id,
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
          this.snackbarService.show('Camapaign edited successfully', 'success');
          this.createFormVisible.emit(false);
        },
        error: (error) => {
          console.log(error);
          this.snackbarService.show(error.error.message, 'error');
        },
      });
  }
  submitCreateFormData() {
    let campaignData: Campaigns = {
      name: this.formControls.name.value!,
      description: this.formControls.description.value!,
      selectedTags: this.formControls.selectedTags.value!,
      workspace_id: this.workspace_id,
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
    console.log(this.campaignForm);
    if (this.campaignForm.valid && this.selectedMessage) {
      this.campaigService.createCampaigns(campaignData).subscribe({
        next: (response: any) => {
          console.log('Inside campaign component ', response);
          this.snackbarService.show('Campaign created successfully', 'success');
          this.createFormVisible.emit(false);
        },
        error: (error) => {
          console.log(error);
          this.snackbarService.show(error.error.message, 'error');
          alert(error.error.message);
        },
      });
    }
  }
}
