import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements AfterViewInit {

  contactForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  // 🔴 CHANGE ONLY THIS URL AFTER DEPLOY
  API_URL = 'https://santhosh-portfolio-backend.onrender.com/api/contact';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }


 submitForm() {
  if (this.contactForm.invalid ) {
    this.contactForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;
  this.successMessage = '';
  this.errorMessage = '';

  this.http.post(this.API_URL, { responseType: 'text' })
    .subscribe({
      next: () => {
        this.successMessage = 'Message sent successfully!';
        this.contactForm.reset();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to send message. Server unreachable.';
        this.isLoading = false;
      }
    });
}

}
