import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

declare var grecaptcha: any;

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

  captchaToken = '';
  captchaError = false;

  // 🔴 CHANGE ONLY THIS URL AFTER DEPLOY
  API_URL = 'https://santhoshkumar-dev-portfolio.netlify.app/api/contact';

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

  ngAfterViewInit() {
    this.renderCaptcha();
  }

  renderCaptcha() {
    setTimeout(() => {
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.render(
          document.querySelector('.g-recaptcha'),
          {
            sitekey: '6LdWAEAsAAAAAAtCUMJUBNm-lEOSkC4oGRoeh8iK',
            callback: (token: string) => {
              this.captchaToken = token;
              this.captchaError = false;
            }
          }
        );
      }
    }, 500);
  }

  submitForm() {
    if (this.contactForm.invalid || !this.captchaToken) {
      this.contactForm.markAllAsTouched();
      this.captchaError = !this.captchaToken;
      return;
    }

    this.isLoading = true;

    const payload = {
      ...this.contactForm.value,
      recaptcha: this.captchaToken
    };

    this.http.post(this.API_URL, payload, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.successMessage = 'Message sent successfully!';
          this.contactForm.reset();
          this.isLoading = false;
          grecaptcha.reset();
          this.captchaToken = '';
        },
        error: () => {
          this.errorMessage = 'Server error. Try again later.';
          this.isLoading = false;
          grecaptcha.reset();
          this.captchaToken = '';
        }
      });
  }
}
