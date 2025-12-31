import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

declare var grecaptcha: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {

  contactForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  captchaToken = '';
  captchaError = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Called by Google reCAPTCHA
    (window as any).onCaptchaResolved = (token: string) => {
      this.captchaToken = token;
      this.captchaError = false;
    };
  }

 submitForm() {
  if (this.contactForm.invalid || !this.captchaToken) {
    this.contactForm.markAllAsTouched();
    this.captchaError = !this.captchaToken;
    return;
  }

  this.isLoading = true;
  this.successMessage = '';
  this.errorMessage = '';

  const payload = {
    ...this.contactForm.value,
    recaptcha: this.captchaToken
  };

  this.http.post(
    'http://localhost:8080/api/contact',
    payload,
    { responseType: 'text' }
  ).subscribe({
    next: () => {
      this.successMessage = 'Message sent successfully!';
      this.contactForm.reset();
      this.isLoading = false;

      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.reset();
      }
      this.captchaToken = '';
    },

   error: (err) => {

  if (err.status === 400) {
   
    this.errorMessage = err.error || 'Invalid input';
  }
  else if (err.status === 429) {
    this.errorMessage = 'Too many messages. Please wait 1 minute.';
  }
  else {
    this.errorMessage = 'Server error. Please try again later.';
  }

  this.isLoading = false;

  if (typeof grecaptcha !== 'undefined') {
    grecaptcha.reset();
  }
  this.captchaToken = '';
}

  });
 }}
