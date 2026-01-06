import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {

  contactForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formData = {
      ...this.contactForm.value,
      website: '' // 🕵️ Honeypot (spam protection)
    };

    emailjs.send(
      import.meta.env['VITE_EMAILJS_SERVICE_ID'],
      import.meta.env['VITE_EMAILJS_ADMIN_TEMPLATE'],
      formData,
      import.meta.env['VITE_EMAILJS_PUBLIC_KEY']
    )
    .then(() => {
      return emailjs.send(
        import.meta.env['VITE_EMAILJS_SERVICE_ID'],
        import.meta.env['VITE_EMAILJS_REPLY_TEMPLATE'],
        formData,
        import.meta.env['VITE_EMAILJS_PUBLIC_KEY']
      );
    })
    .then(() => {
      this.successMessage = 'Message sent successfully!';
      this.contactForm.reset();
      this.isLoading = false;
    })
    .catch(() => {
      this.errorMessage = 'Failed to send message. Please try again later.';
      this.isLoading = false;
    });
  }
}
