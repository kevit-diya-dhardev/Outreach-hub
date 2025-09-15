import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contact } from './models/contacts';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  @Input() mode!: string;

  @Output() formClose = new EventEmitter();
  tagInput: string = '';
  initialData!: Contact;

  constructor(private fb: FormBuilder) {}
  onSubmit() {}

  contactForm = this.fb.group({
    contact_name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    tags: [[] as string[]],
  });
  get formControls() {
    return this.contactForm.controls;
  }
  get tags(): string[] {
    return this.contactForm.get('tags')?.value || [];
  }
  ngOnInit() {
    if (this.mode == 'edit' && !this.initialData) {
      this.contactForm.patchValue(this.initialData);
    }
  }
  removeTag(tagToRemove: string): void {
    const currentTags = this.tags.filter((tag) => tag !== tagToRemove);
    this.contactForm.get('tags')?.setValue(currentTags);
  }
  addTag() {
    if (this.tagInput && !this.tags.includes(this.tagInput)) {
      const currentTags = this.tags;
      currentTags.push(this.tagInput.trim());
      this.contactForm.get('tags')?.setValue(currentTags);
      this.tagInput = '';
    }
  }

  close(): void {
    this.formClose.emit();
  }
}
