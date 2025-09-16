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
  @Input() initialData!: Contact;
  @Output() formClose = new EventEmitter();
  @Output() formSubmit = new EventEmitter();
  tagInput: string = '';

  constructor(private fb: FormBuilder) {}
  onSubmit() {
    if (this.contactForm.valid) {
      if (this.mode == 'edit') {
        _id: this.initialData._id;
      }
      this.formSubmit.emit({
        ...this.contactForm.getRawValue(),
        phoneNumbe: Number(this.contactForm.value.phoneNumber),
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

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
    if (this.mode == 'edit' && this.initialData) {
      const formData = {
        ...this.initialData,
        phoneNumber: this.initialData.phoneNumber.toString(),
      };
      this.contactForm.patchValue(formData);
    }
  }
  removeTag(tagToRemove: string): void {
    const currentTags = this.tags.filter((tag) => tag !== tagToRemove);
    this.contactForm.get('tags')?.setValue(currentTags);
  }
  addTag(tagValue: string) {
    this.tagInput = tagValue;
    if (this.tagInput && !this.tags.includes(this.tagInput)) {
      this.tags.push(this.tagInput.trim());
      this.tagInput = '';
    }
  }

  close(): void {
    this.formClose.emit();
  }
}
